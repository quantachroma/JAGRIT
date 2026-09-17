import os
import json
import httpx
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class ExtractedEntities(BaseModel):
    problem: str
    affected_group: str
    location_details: Dict[str, str]
    root_causes: List[str]
    primary_impact: str
    vulnerable_subgroups: List[str]
    seasonal_sensitivity: str
    resolution_tier: str
    is_pesa_jurisdiction: bool

class PriorityBreakdown(BaseModel):
    severity_score: float
    urgency_score: float
    population_score: float
    economic_score: float
    reversibility_score: float
    equity_multiplier: float
    final_priority_score: float
    priority_band: str
    explainability_log: List[str]

class SocietalProblemClassifier:
    def __init__(self):
        self.openrouter_key = os.getenv("OPENROUTER_API_KEY", "")
        self.model = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat")
        self.tribal_regions = ["khunti", "palamu", "gumla", "chaibasa", "simdega", "dumka", "latehar", "pakur"]
        self.civic_terms = ["pothole", "sadak", "kachra", "garbage", "streetlight", "bulb", "naali", "drain"]
        self.health_toxins = ["arsenic", "fluoride", "laal daah", "laal paani", "iron", "skin disease", "fluorosis"]
        self.vulnerable_terms = {
            "school_children": ["school", "vidyalaya", "bacche", "children", "midday meal", "chhatra"],
            "tribal_artisans": ["lac", "kusmi", "lah", "tussar", "silk", "karigar", "forest produce"],
            "farmers": ["kisan", "crop", "fasal", "irrigation", "khet", "storage"],
            "women_infants": ["mahila", "anganwadi", "pregnant", "mother", "infant"]
        }

    async def extract_information(self, title: str, description: str, district: str) -> ExtractedEntities:
        """Tries OpenRouter LLM first; gracefully falls back to local heuristic."""
        if self.openrouter_key and "your-openrouter" not in self.openrouter_key:
            try:
                prompt = f"""
                You are the JAGRIT Civic & Academic Triage AI for Jharkhand, India.
                Analyze this societal issue:
                Title: {title}
                Description: {description}
                District: {district}

                Extract the following strictly as valid JSON:
                {{
                    "problem": "{title}",
                    "affected_group": "Who is suffering?",
                    "location_details": {{"district": "{district}", "jurisdiction": "General Area"}},
                    "root_causes": ["causes"],
                    "primary_impact": "impact",
                    "vulnerable_subgroups": ["school_children" or "tribal_artisans" or "farmers" or "none"],
                    "seasonal_sensitivity": "MONSOON_CRITICAL" or "SUMMER_ACUTE" or "PERENNIAL",
                    "resolution_tier": "TIER_1_CIVIC_ROUTINE" or "TIER_2_STANDARD_ENGINEERING" or "TIER_3_APPLIED_RND",
                    "is_pesa_jurisdiction": true or false
                }}
                """
                async with httpx.AsyncClient(timeout=8.0) as client:
                    res = await client.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {self.openrouter_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": self.model,
                            "messages": [{"role": "user", "content": prompt}],
                            "response_format": {"type": "json_object"}
                        }
                    )
                    if res.status_code == 200:
                        data = json.loads(res.json()["choices"][0]["message"]["content"])
                        return ExtractedEntities(**data)
            except Exception:
                pass  # Fallback to local heuristic below

        # Offline / Heuristic Extraction
        combined = f"{title} {description}".lower()
        vulnerable = []
        for group, keywords in self.vulnerable_terms.items():
            if any(k in combined for k in keywords):
                vulnerable.append(group)

        causes = []
        if any(w in combined for w in ["iron", "arsenic", "fluoride", "laal"]):
            causes.append("Geological aquifer heavy metal contamination")
        if any(w in combined for w in ["corrosion", "broken", "choke"]):
            causes.append("Mechanical failure / pipe corrosion")
        if not causes:
            causes.append("Aging civic infrastructure")

        is_pesa = any(r in district.lower() or r in combined for r in self.tribal_regions)
        is_chemical = any(k in combined for k in self.health_toxins) or "lac" in combined
        is_civic = any(k in combined for k in self.civic_terms)

        tier = "TIER_3_APPLIED_RND" if is_chemical else ("TIER_1_CIVIC_ROUTINE" if is_civic else "TIER_2_STANDARD_ENGINEERING")

        return ExtractedEntities(
            problem=title,
            affected_group="Community members" if not vulnerable else f"Priority: {', '.join(vulnerable)}",
            location_details={"district": district, "jurisdiction": "Fifth Schedule (PESA Gram Sabha)" if is_pesa else "General Area"},
            root_causes=causes,
            primary_impact="Chronic health hazard" if is_chemical else "Disruption of daily municipal service",
            vulnerable_subgroups=vulnerable,
            seasonal_sensitivity="MONSOON_CRITICAL" if "barish" in combined else "PERENNIAL",
            resolution_tier=tier,
            is_pesa_jurisdiction=is_pesa
        )

    def calculate_priority(self, entities: ExtractedEntities, text: str) -> PriorityBreakdown:
        text_lower = text.lower()
        logs = []

        # 1. Severity
        severity = 95.0 if any(tox in text_lower for tox in self.health_toxins) else (80.0 if "lac" in text_lower else 35.0)
        logs.append(f"Severity ({severity}/100): Calculated from chemical hazard/economic threat level.")

        # 2. Urgency
        urgency = 92.0 if "school_children" in entities.vulnerable_subgroups else 60.0
        logs.append(f"Urgency ({urgency}/100): Demographic vulnerability weighting.")

        pop_score = 75.0
        econ_score = 85.0 if "tribal_artisans" in entities.vulnerable_subgroups else 30.0
        rev_score = 90.0 if severity > 80 else 40.0

        raw_base = (severity * 0.25) + (urgency * 0.20) + (pop_score * 0.15) + (econ_score * 0.20) + (rev_score * 0.20)
        
        multiplier = 1.0
        if "school_children" in entities.vulnerable_subgroups:
            multiplier *= 1.15
            logs.append("Child Safety: Safeguard multiplier (x1.15) applied.")
        if entities.is_pesa_jurisdiction:
            multiplier *= 1.10
            logs.append("Tribal Welfare: PESA Fifth Schedule multiplier (x1.10) applied.")

        final_score = min(100.0, round(raw_base * multiplier, 1))
        band = "CRITICAL" if final_score >= 85 else ("HIGH" if final_score >= 70 else ("MEDIUM" if final_score >= 40 else "LOW"))

        return PriorityBreakdown(
            severity_score=severity,
            urgency_score=urgency,
            population_score=pop_score,
            economic_score=econ_score,
            reversibility_score=rev_score,
            equity_multiplier=round(multiplier, 2),
            final_priority_score=final_score,
            priority_band=band,
            explainability_log=logs
        )
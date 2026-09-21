import logging
import threading
from typing import Any, Dict, List, Literal, Optional, Union

from core.config import settings

logger = logging.getLogger("jagrit.ai.loader")
_model_lock = threading.Lock()


# --- Mock Implementations ---

class MockWhisperModel:
    """Mock Whisper model providing deterministic audio transcription."""

    def transcribe(self, audio_path: Union[str, Any], *args: Any, **kwargs: Any) -> Dict[str, Any]:
        return {
            "text": "[MOCK TRANSCRIPTION]",
            "language": "hi",
            "segments": [
                {
                    "start": 0.0,
                    "end": 2.5,
                    "text": "[MOCK TRANSCRIPTION]",
                }
            ],
        }

    def __call__(self, *args: Any, **kwargs: Any) -> Dict[str, Any]:
        return self.transcribe(*args, **kwargs)


class MockViTModel:
    """Mock ViT model providing deterministic defect scanning."""

    def predict(self, image: Any = None, *args: Any, **kwargs: Any) -> Dict[str, Any]:
        return {
            "defects": [
                {
                    "label": "structural_defect",
                    "confidence": 0.94,
                    "bbox": [0.1, 0.2, 0.5, 0.6],
                }
            ],
            "is_defective": True,
        }

    def __call__(self, *args: Any, **kwargs: Any) -> Dict[str, Any]:
        return self.predict(*args, **kwargs)


class MockDeBERTaModel:
    """Mock DeBERTa model providing deterministic zero-shot classification / triage."""

    def predict(
        self,
        text: str = "",
        candidate_labels: Optional[List[str]] = None,
        *args: Any,
        **kwargs: Any,
    ) -> Dict[str, Any]:
        labels = candidate_labels or ["Civic Routine", "Applied R&D"]
        scores = [0.85] + [0.15 / max(1, len(labels) - 1)] * (len(labels) - 1)
        return {
            "sequence": text,
            "labels": labels,
            "scores": scores,
            "top_label": labels[0],
        }

    def __call__(self, *args: Any, **kwargs: Any) -> Dict[str, Any]:
        return self.predict(*args, **kwargs)


class MockTextGenerationModel:
    """Mock text-generation model returning the supplied deterministic prompt."""

    def generate(self, prompt: str, *args: Any, **kwargs: Any) -> str:
        return prompt


# --- Lazy Model Loaders ---

class WhisperModelLoader:
    _instance: Optional["WhisperModelLoader"] = None
    _model: Any = None

    @classmethod
    def get_instance(cls) -> "WhisperModelLoader":
        if cls._instance is None:
            with _model_lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def get_model(self) -> Any:
        if self._model is not None:
            return self._model

        with _model_lock:
            if self._model is not None:
                return self._model

            if settings.MODEL_MOCK_MODE:
                logger.info("MODEL_MOCK_MODE is active. Using MockWhisperModel.")
                self._model = MockWhisperModel()
                return self._model

            try:
                import torch
                from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor
                model_id = "openai/whisper-tiny"
                model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id)
                model = model.to(settings.MODEL_DEVICE)
                self._model = model
                return self._model
            except Exception as exc:
                logger.warning(f"falling back to mock mode for whisper: {exc}")
                self._model = MockWhisperModel()
                return self._model


class ViTModelLoader:
    _instance: Optional["ViTModelLoader"] = None
    _model: Any = None

    @classmethod
    def get_instance(cls) -> "ViTModelLoader":
        if cls._instance is None:
            with _model_lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def get_model(self) -> Any:
        if self._model is not None:
            return self._model

        with _model_lock:
            if self._model is not None:
                return self._model

            if settings.MODEL_MOCK_MODE:
                logger.info("MODEL_MOCK_MODE is active. Using MockViTModel.")
                self._model = MockViTModel()
                return self._model

            try:
                import torch
                from transformers import AutoModelForImageClassification
                model_id = "google/vit-base-patch16-224"
                model = AutoModelForImageClassification.from_pretrained(model_id)
                model = model.to(settings.MODEL_DEVICE)
                self._model = model
                return self._model
            except Exception as exc:
                logger.warning(f"falling back to mock mode for vit: {exc}")
                self._model = MockViTModel()
                return self._model


class DeBERTaModelLoader:
    _instance: Optional["DeBERTaModelLoader"] = None
    _model: Any = None

    @classmethod
    def get_instance(cls) -> "DeBERTaModelLoader":
        if cls._instance is None:
            with _model_lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def get_model(self) -> Any:
        if self._model is not None:
            return self._model

        with _model_lock:
            if self._model is not None:
                return self._model

            if settings.MODEL_MOCK_MODE:
                logger.info("MODEL_MOCK_MODE is active. Using MockDeBERTaModel.")
                self._model = MockDeBERTaModel()
                return self._model

            try:
                import torch
                from transformers import AutoModelForSequenceClassification
                model_id = "cross-encoder/nli-deberta-v3-small"
                model = AutoModelForSequenceClassification.from_pretrained(model_id)
                model = model.to(settings.MODEL_DEVICE)
                self._model = model
                return self._model
            except Exception as exc:
                logger.warning(f"falling back to mock mode for deberta: {exc}")
                self._model = MockDeBERTaModel()
                return self._model


class TextGenerationModelLoader:
    _instance: Optional["TextGenerationModelLoader"] = None
    _model: Any = None

    @classmethod
    def get_instance(cls) -> "TextGenerationModelLoader":
        if cls._instance is None:
            with _model_lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def get_model(self) -> Any:
        if self._model is not None:
            return self._model

        with _model_lock:
            if self._model is not None:
                return self._model

            if settings.MODEL_MOCK_MODE:
                logger.info("MODEL_MOCK_MODE is active. Using MockTextGenerationModel.")
                self._model = MockTextGenerationModel()
                return self._model

            # TODO(production): wire to a real LLM provider after the provider/key decision.
            logger.warning("No text-generation provider configured; using mock text generation.")
            self._model = MockTextGenerationModel()
            return self._model


def get_model(name: Literal["whisper", "vit", "deberta", "text_gen"]) -> Any:
    """
    Factory function routing model requests to the appropriate singleton loader.
    Only entrypoint that routers and services should import.
    """
    if name == "whisper":
        return WhisperModelLoader.get_instance().get_model()
    elif name == "vit":
        return ViTModelLoader.get_instance().get_model()
    elif name == "deberta":
        return DeBERTaModelLoader.get_instance().get_model()
    elif name == "text_gen":
        return TextGenerationModelLoader.get_instance().get_model()
    else:
        raise ValueError(
            f"Unknown model name: {name}. Expected 'whisper', 'vit', 'deberta', or 'text_gen'."
        )


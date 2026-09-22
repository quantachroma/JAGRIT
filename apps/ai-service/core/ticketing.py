from datetime import datetime
from uuid import uuid4


def generate_ticket_id() -> str:
    # TODO(stage-3): replace with real dedup-aware ticket assignment (format will become JAG-YYYY-DIST-XXXX once district codes and the composite dedup engine exist).
    return f"JAG-{datetime.now().year}-PENDING-{uuid4().hex[:6]}"
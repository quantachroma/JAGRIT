import wave

import numpy as np


def generate_synthetic_wav(
    path: str, duration_seconds: float = 2.0, sample_rate: int = 16000
) -> None:
    sample_count = int(duration_seconds * sample_rate)
    timeline = np.arange(sample_count) / sample_rate
    samples = (0.1 * 32767 * np.sin(2 * np.pi * 440 * timeline)).astype(np.int16)

    with wave.open(path, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(samples.tobytes())
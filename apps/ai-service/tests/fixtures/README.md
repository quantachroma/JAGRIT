# Test Fixtures

Drop real speech audio fixtures here manually: `sample_santhali.wav` and
`sample_hindi.wav`. Do not attempt to generate real speech.

Automated tests use a programmatically generated synthetic tone/silence WAV
(see `synthetic_wav.py`) because they only need valid WAV structure for testing
HTTP contracts and response shape, not real speech content.
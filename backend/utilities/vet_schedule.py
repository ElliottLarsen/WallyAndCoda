from datetime import (
    datetime,
    timedelta,
)
import os
from dotenv import load_dotenv

load_dotenv()

WALLY_DOB = os.getenv("WALLY_DOB")
CODA_DOB = os.getenv("CODA_DOB")
DATE_FORMAT = os.getenv("DATE_FORMAT")

wally_dob = datetime.strptime(WALLY_DOB, DATE_FORMAT)
coda_dob = datetime.strptime(CODA_DOB, DATE_FORMAT)


def da2pp(dob):
    first_early = dob + timedelta(days=42)
    first_late = dob + timedelta(days=56)

    second_early = dob + timedelta(days=70)
    second_late = dob + timedelta(days=84)

    third_early = dob + timedelta(days=98)
    third_late = dob + timedelta(days=112)

    return {
        "first": {
            "early": first_early.strftime("%Y/%m/%d"),
            "late": first_late.strftime("%Y/%m/%d"),
        },
        "second": {
            "early": second_early.strftime("%Y/%m/%d"),
            "late": second_late.strftime("%Y/%m/%d"),
        },
        "third": {
            "early": third_early.strftime("%Y/%m/%d"),
            "late": third_late.strftime("%Y/%m/%d"),
        },
    }
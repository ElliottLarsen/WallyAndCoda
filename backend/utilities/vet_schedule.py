from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

WALLY_DOB = os.getenv("WALLY_DOB")
CODA_DOB = os.getenv("CODA_DOB")
DATE_FORMAT = os.getenv("DATE_FORMAT")

wally_dob = datetime.strptime(WALLY_DOB, DATE_FORMAT)
coda_dob = datetime.strptime(CODA_DOB, DATE_FORMAT)

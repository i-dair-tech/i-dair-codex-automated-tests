# I-DAIR-PLAYWRIGHT


# install playwright if not installed 
npx playwright install


# Create .env file 
USERNAME="your email"
PWD="your pdw "
INPUT_FILE_PATH="file path"
INPUT_FILE_with_SC_PATH=""
INPUT_FILE_SIZE_PATH=""
INPUT_FILE_Empty_PATH=""
INPUT_FILE_PDF_PATH=""
INPUT_FILE_PNG_PATH=""
INPUT_PREDICTION_PATH=""


# run project 
npx playwright test  --project=chromium --headed

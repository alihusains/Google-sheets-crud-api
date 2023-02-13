# Google-sheets-crud-api
**Complete Google Sheets CRUD API** without TOKEN 2023.

# GOOGLE APP SCRIPT ONLY SUPPORTS doGet(e) & doPost(e) methods. Hence I have modified the doPost(e) method to add Update and Delete Functions with the help of actions.
# if you're facing CORS issues use this header while making API Requests : 'Content-Type' : 'text/plain' 

  # GET API (RETURNS ALL ROWS) : 
curl --location --request GET 'https://script.google.com/macros/s/<YOUR_SCRIPT_ID_HERE>/exec?action=read' \
--header 'Content-Type: application/json'

  # GET API ( RETURNS ROW BY ID )
curl --location --request GET 'https://script.google.com/macros/s/<YOUR_SCRIPT_ID_HERE>/exec?action=read&sheet=main&id=79' \
--header 'Content-Type: application/json'

  # POST API (CREATE / ADD NEW ROW ) || Required : Sheetname

curl --location --request POST 'https://script.google.com/macros/s/<YOUR_SCRIPT_ID_HERE>/exec?action=create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"sheet": "<YOUR_SHEET_NAME_HERE>", "column1":"value1","column2":"value2"}'
<!--   add as many columns as you want || Data will only be filled if your sheet has the columns that are mentioned -->
	
  
  # POST API (UPDATE / MODIFY ROW ) || Required : Sheetname, id of the row

curl --location --request POST 'https://script.google.com/macros/s/<YOUR_SCRIPT_ID_HERE>/exec?action=update' \
--header 'Content-Type: application/json' \
--data-raw '{
	"sheet": "<YOUR_SHEET_NAME_HERE>", "id":"2" "column1":"value1", "column2":"value2"}'
  
   # POST API (DELETE ROW ) || Required : Sheetname, id of the row to be deleted

curl --location --request POST 'https://script.google.com/macros/s/<YOUR_SCRIPT_ID_HERE>/exec?action=delete' \
--header 'Content-Type: application/json' \
--data-raw '{"sheet": "<YOUR_SHEET_NAME_HERE>", "id":"2"}'
  
  
  
  
  

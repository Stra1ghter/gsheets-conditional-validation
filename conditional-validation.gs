function onEdit() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var einnahmenAusgabenSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Einnahmen_Ausgaben");
  var helperDropdownSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HelperDropdown");
  var activeCell = spreadsheet.getActiveCell();
  
  
  if(spreadsheet.getName() != "Einnahmen_Ausgaben") {    
    return;
  }
  
  if(activeCell.getColumn() != 7) {
    return;
  }
  
  if(activeCell.getRow() <= 2){
    return;
  }
  
  Logger.log("Selected cell to act upon: " + activeCell.getA1Notation());
  
  var categoryName = activeCell.getDisplayValue();
  
  Logger.log("selected category name: \"" + categoryName + "\"");
  
  //iterate over categories in HelperDropdown
  for (let i = 3; i <= 13; i++) {    
    const cell = helperDropdownSheet.getRange(1, i);
    const displayValue = cell.getDisplayValue().replace(" ", "");
    
    Logger.log("iteration value : " + i)
    Logger.log("iterating over category: \"" + displayValue + "\"")
    
    if(displayValue == ""){
      return;
    }
     
    if(displayValue == categoryName){
      Logger.log("Found subcategory to category: " + cell.getDisplayValue());
      
      var targetCellForValidation = activeCell.offset(0, 1);
      
      var validationRange = helperDropdownSheet.getRange(2, i, 995, 1); // get the range over the validation set
      var validationRule = SpreadsheetApp.newDataValidation().requireValueInRange(validationRange).build();
      Logger.log("Validation set starts with: " + validationRange.getDisplayValue());
      
      targetCellForValidation.setDataValidation(validationRule);
      
      return;
    }

  }

}

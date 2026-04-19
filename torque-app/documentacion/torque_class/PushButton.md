# PushButton
Used when the script is being used in a pushbutton

Pushbutton scripts are slightly different to normal scripts in that they only exist as part of the pushbutton itself

There are only 2 default functions in a pushbutton script, below is a quick example:

  // This is called when the pushbutton is created
  onInit = function() {
     // Do some init here when the button was created...
     // Variable creation is easy: 
     var someLocalVariable = "moose";
     someGlobalVariable = "fishcake";
  }


  /**
   * This function is called when the button is clicked by the user
   * 
   * 'pushButton' is an automatically set global variable referencing the source pushButton the user clicked
   */
  onButtonClicked = function() {

     pushButton.setTopText("Was");
     pushButton.setBottomText("Clicked!");
 
  }

## Methods
 

    /**
     * Used to set the top text part of the pushbutton
     * @param label
     */
    public void setTopText(String label);
        

    /**
     * Used to set the bottom text part of the pushbutton
     * @param label
     */
    public void setBottomText(String text);
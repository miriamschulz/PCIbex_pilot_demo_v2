// This script contains a test demo for C3_WP3_exp3.1a-pilot (version 2).
// In version 2, the frequency manipulated object is presented 2x per display.
// Miriam Schulz
// 19-12-2022


PennController.ResetPrefix(null);
// DebugOff()

// PreloadZip("https://downgit.github.io/#/home?url=https://github.com/miriamschulz/PCIbex_images/blob/main/images_compressed.zip")
// PennController.AddHost("https://downgit.github.io/#/home?url=https://github.com/miriamschulz/PCIbex_images/blob/main/images_compressed.zip"); // Pictures

var progressBarText = "Fortschritt";

Sequence("intro",
         "preloadTrials",
         "trials",
         SendResults());

CheckPreloaded()
    .label("preloadTrials")


// Intro screen
PennController("intro",
    newHtml("intro", "intro.html")
        .print()
    ,
    newButton("Experiment starten")
        .center()
        .bold()
        .print()
        .wait()
)
.log("Experiment", "Survey_html")


// Set default formatting for all Text, Button and Html elements:
Header(
    defaultText
        .cssContainer({"font-size": "16px", "text-align":"center", "padding-top": "16px"})
        .center()
        .print()
    ,
    defaultButton
        .cssContainer({"height": "35px", "padding-top": "20px", "padding-bottom": "20px"})
        .center()
        .bold()
        .print()
)

// Experimental trials
Template("data.csv", row =>
  newTrial("trials",
      defaultImage.size(300,300)
      ,
      // Transition between trials: press enter
      // newText("anyKeyText", "Drücken Sie eine beliebige Taste, um fortzufahren.")
      //     // .cssContainer({"font-family": "monospace", "font-size": "25px", "padding-top": "50px", "line-height": "400%"})
      //     .italic()
      // ,
      // newKey("anyKey", "")
      //     .wait()
      // ,
      // getText("anyKeyText")
      //     .remove()
      // ,
      // For the demo version, display the condition or filler type:
      newText("trialType", row.Type)
          .cssContainer({"padding-bottom": "20px"})
          .bold()
      ,
      // Wait 500ms before showing the picture
      newTimer("pre-trial-timer", 500).start().wait()
      ,
      // Display picture without the target selected for 1000ms
      newImage("pictureUnselected", row.PictureUnselected)
          .center()
          .print()
      ,
      newTimer("picture-previewing-timer", 1000).start().wait()
      ,
      getImage("pictureUnselected")
          .remove()
      ,
      // Display picture with the target selected
      newImage("pictureSelected", row.PictureSelected)
          .center()
          .print()
      ,
      newText("describePicture", "Beschreiben Sie die rot umrandete Box. <br>Wenn Sie fertig sind, drücken Sie eine beliebige Taste, um fortzufahren.")
          .italic()
      ,
      newKey("anyKey2", "")
          .wait()
      ,
      getText("describePicture")
          .remove()
      ,
      newText("Die Antwort Ihres Mitspielers lautet:")
          .italic()
      ,
      newTimer("listener-response-timer", 1500).start().wait()
      ,
      // Listener choice
      newText("listenerResponse", row.ListenerResponse)
          // .cssContainer({"font-family": "monospace", "font-size": "25px", "padding-top": "100px", "padding-bottom": "50px"})
          .cssContainer({"font-family": "monospace", "font-size": "25px"})
          .bold()
      ,
      newTimer("speaker-response-timer", 500).start().wait()
      ,
      newCanvas(300,200)
          .add(0,0, newText("Taste D").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "20px 10px 10px 20px"}))
          .add(200,0, newText("Taste K").cssContainer({"font-family": "monospace", "font-size": "15px", "padding": "20px 10px 10px 20px"}))
          .add(0,50, newText("Falsch").color("red").bold().cssContainer(
              {"font-family": "monospace", "font-size": "20px", "border": "solid 1px red", "padding": "10px 10px 10px 10px"}))
          .add(200,50, newText("Richtig").color("green").bold().cssContainer(
              {"font-family": "monospace", "font-size": "20px", "border": "solid 1px green", "padding": "10px 10px 10px 10px"}))
          .log()
          .center()
          .print()
      ,
      newKey("speakerResponse", "DK")
          .log()
          .wait()
    )
    .log("ItemNum", row.Item)
    .log("Condition", row.Condition)
    .log("Correct", row.Correct)
    // .log("List", row.Group)
)

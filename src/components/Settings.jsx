import Form from './Form'

function Settings({resultCallback}) {
      const testForm = {
        inputs: [
          {
            type: "text",
            label: "Player name",
            id: "PlayerName"
          },
          {
            type: "dropdown",
            label: "Grid size",
            id: "Gridsize",
            options: [
              10, 12, 14, 16
            ]
          },
          {
            type: "checkbox",
            label: "Use bomb chance (instead of bomb count)",
            id: "useChance"
          },
          {
            type: "dropdown",
            label: "Bomb spawn chance",
            id: "BombPercentage",
            options: [
              10, 15, 20
            ],
            conditional: {"ChanceOrCount":true}//WIP
          },
          {
            type: "number",
            label: "Bomb count",
            id: "BombCount",
            options: [
              10, 20, 30
            ],
            conditional: {"ChanceOrCount":false}//WIP
          }
        ]
      }

      function submitCallback(result) {
        resultCallback(parseForm(result))
      }
    
      function parseForm(form) {
        let formObject = {};
        for(let formIndex=0;formIndex<form.length-1;formIndex++){
          if(form[formIndex].type == "checkbox"){
            formObject[form[formIndex].id] = form[formIndex].checked
          }else{
            formObject[form[formIndex].id] = form[formIndex].value
          }
        }
        return(formObject)
      }
      
      return(
        <div style={{"position": "fixed",
          "top": "0",
          "left": "0",
          "width": "100%",
          "height": "100%",
          "display": "flex",
          "justifyContent": "center",
          "alignItems": "center",
          "zIndex": "1000"}}>
          <div style={{"background": "white",
            "padding": "20px",
            "borderRadius": "10px",
            "textAlign": "center",
            "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "width": "300px"}}>
              <Form form={testForm} submitCallback={submitCallback}/>
          </div>
        </div>
    )
}

export default Settings
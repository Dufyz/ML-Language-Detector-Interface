function globalFunction() {

    const Form = document.querySelector('.formMainContent')
    const FormResultado = document.querySelector('.formResultadoData')

    function handleSubmit(e) {
        e.preventDefault()
        const clientInput = Form.querySelector('#clientInput').value
        const clientInput_dict = { clientInput } //Pass the javascript variables to a dictionary.
        const clientInput_json = JSON.stringify(clientInput_dict) // Stringify converts a JavaScript object or value to a JSON string

        $.ajax({
            url: "/clientInput",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(clientInput_json)
        })

        url = "http://127.0.0.1:5000/clientOutput"
        const xhttp = new XMLHttpRequest()
        xhttp.open('GET', url, false)
        xhttp.send()
        const output_original = xhttp.responseText
        const output = JSON.parse(output_original)
        const clientOutput=  output.clientOutput
        FormResultado.innerHTML = clientOutput
        // console.log(output)
        // console.log(output.clientInput)
        console.log(clientOutput)


    }

    Form.addEventListener('submit', handleSubmit)
}

globalFunction()
const express = require('express')
const fetch = require('node-fetch')
const exec = require('child_process').exec

const app = express()
app.use(express.static('msacs'))
app.use(express.urlencoded())
app.use(express.json())
app.get('/', (req, res) => {
});

app.post('/deployment', (req, response) => {
	let data = req.body
	let apiUrl = data.apiUrl
	if (apiUrl[apiUrl.length - 1] === '/')
		apiUrl = apiUrl.slice(0, apiUrl.length - 1)
	delete data.apiUrl
	fetch(`${apiUrl}/apis/apps/v1beta1/namespaces/default/deployments/${data.metadata.name}`)
        .then(data => data.json())
        .then(res => {
            if (res.code === 404) {
				const child = exec(`curl -X POST -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/apis/apps/v1beta1/namespaces/default/deployments`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            } else {
                const child = exec(`curl -X PUT -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/apis/apps/v1beta1/namespaces/default/deployments/${data.metadata.name}`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            }
        })
})

app.post('/service', (req, response) => {
	let data = req.body
	let apiUrl = data.apiUrl
	if (apiUrl[apiUrl.length - 1] === '/')
		apiUrl = apiUrl.slice(0, apiUrl.length - 1)
	delete data.apiUrl
	fetch(`${apiUrl}/api/v1/namespaces/default/services/${data.metadata.name}`)
        .then(data => data.json())
        .then(res => {
            if (res.code === 404) {
				exec(`curl -X POST -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/namespaces/default/services`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            } else {
				exec(`curl -X PUT -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/namespaces/default/services/${data.metadata.name}`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            }
        })
})

app.post('/pv', (req, response) => {
	let data = req.body
	let apiUrl = data.apiUrl
	if (apiUrl[apiUrl.length - 1] === '/')
		apiUrl = apiUrl.slice(0, apiUrl.length - 1)
	delete data.apiUrl
	fetch(`${apiUrl}/api/v1/persistentvolumes/${data.metadata.name}`)
		.then(data => data.json())
		.then(res => {
			if (res.code === 404) {
				exec(`curl -X POST -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/persistentvolumes`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            } else {
				exec(`curl -X PUT -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/persistentvolumes/${data.metadata.name}`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            }
		})
})

app.post('/pvc', (req, response) => {
	let data = req.body
	let apiUrl = data.apiUrl
	if (apiUrl[apiUrl.length - 1] === '/')
		apiUrl = apiUrl.slice(0, apiUrl.length - 1)
	delete data.apiUrl
	fetch(`${apiUrl}/api/v1/namespaces/default/persistentvolumeclaims/${data.metadata.name}`)
		.then(data => data.json())
		.then(res => {
			if (res.code === 404) {
				exec(`curl -X POST -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/namespaces/default/persistentvolumeclaims`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            } else {
				exec(`curl -X PUT -H "Content-Type: application/json" -d "${JSON.stringify(data).replace(/\"/g, `\\"`)}" ${apiUrl}/api/v1/namespaces/default/persistentvolumeclaims/${data.metadata.name}`, 
					(err, std, stderr) => response.send(JSON.parse(std))
				)
            }
		})
})

const server = app.listen(8081, () => {
	const host = server.address().address
	const port = server.address().port
  
 	console.log("Example app listening at 'http://%s:%s'", host, port)
})
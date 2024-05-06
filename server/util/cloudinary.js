require("dotenv").config();
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: 'ztcloud',
    api_key: '538521371714285',
    api_secret: 'PUXJ-pO-RREUEdLtOxVJXBJAqx8'
})

module.exports = {cloudinary}
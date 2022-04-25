import "./error.css"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"


const Error = () => {

    return (
        <div className="errorContainer">
            <div className="errorText">
            <Box sx={{ letterSpacing: 4, fontSize: 25 }}>
                Sidan kunde inte hittas
            </Box>

        </div>
        </div>
    )
}

export default Error
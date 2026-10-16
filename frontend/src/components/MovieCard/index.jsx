import "./style.css";

import {
    Card,
    CardContent,
    Button,
    Box,
    Grid,
    Typography

} from "@mui/material";


const MovieCard = ({movie, onDelete})=>{
    const confirmDelete = (movie)=>{
        if(window.confirm(`Do you want to delete ${movie.title} from your page?`)){
            onDelete(movie);
        };
    };
    
    return (
    <Card variant="outlined" sx={{marginTop: 2 }}>
        {/*Using Card and CardContent to display content in a structured form*/}
        <CardContent>
        {/*Using the Grid component to arrange and space elements*/}
        <Grid container columns={12} wrap="nowrap">
            <img
                alt="movie-img"
                style={{height:"auto", width:"80%"}}
                source={movie.poster}
            />
        </Grid>
        <Grid item size={8} padding="20px">
            <Box 
                height="100%"
                display="flex"
                flexDirection="column"
                flexWrap="nowrap"
                gap={2}
            >
                <Box display="flex" flexWrap="wrap">
                {/*Using the Typography component for text styling*/}
                    <Typography variant="h6">
                        {`${movie.title} (${movie.year})`}
                    </Typography>
                    <Box marginLeft="auto" display="flex" gap="5px">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={()=> setIsEditable(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={()=> confirmDelete(movie)}                    
                        >
                            X
                        </Button>
                    </Box>
                </Box>
                <Typography fontStyle="italic">
                    {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                </Typography>
                {/* color selected from default theme https://mui.com/material-ui/customization/palette/ */}
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    borderRadius={5}
                    justifyContent="center"
                    backgroundColor="warning.main"
                    p={2}
                    color="white"
                >
                    {movie.synopsis}
                </Box>
            </Box>

        </Grid>
        </CardContent>
    </Card>
    );
};


export {MovieCard};
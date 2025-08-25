import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Card, CardContent, Typography, Box, CardMedia } from "@mui/material";

export function getImageItem ({ item, data, onClickFunction }) {
    return (
        <ImageListItem key={data.id} onClick={() => onClickFunction(item)}>
                <img
                    src={`${data.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${data.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={data.name}
                    loading="lazy"
                    style={{cursor:'pointer'}}
                />
                <ImageListItemBar
                    title={data.name}
                    actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${data.name}`}
                    >
                        { data.icon === 0? <InfoIcon /> : <AddIcon />}
                    </IconButton>
                    }
                />
        </ImageListItem>
    )
}

export function getImageItem2 ({ item, data, onClickFunction }) {
    return (
        <ImageListItem key={data.id} onClick={() => onClickFunction(item)}>
                <img
                    src={`${data.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${data.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={data.name}
                    loading="lazy"
                    style={{cursor:'pointer'}}
                />
        </ImageListItem>
    )
}

export function getImageCard ({ item, data, onClickFunction }) {
    return (
        <Grid item xs={6} sm={4} md={3} lg={2} key={data.id}>
            <Card
                onClick={() => onClickFunction(item)}
                sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)" },
                }}
            >
                <Box
                    sx={{
                    width: "100%",
                    aspectRatio: "2 / 3",
                    backgroundColor: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <img
                        src={data.image}
                        alt={data.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover" 
                        }}
                    />
                </Box>
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                        {data.name}
                    </Typography>
                </CardContent>
            </Card>
      </Grid>
    )
}

export function getNewCharacterCard ({ item, data, onClickFunction }) {
    return (
        <Card onClick={() => onClickFunction(item)}
            key={data.id}
            sx={{
                width: 140,
                flexShrink: 0,
                borderRadius: "10px",
                overflow: "hidden",
                background: "rgba(0,0,0,0.7)",
                color: "white",
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={data.image}
                alt={data.name}
                sx={{
                    objectFit: "cover",
                }}
            />
            <CardContent sx={{ p: 1 }}>
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    noWrap
                    sx={{
                        textShadow: "1px 1px 3px black",
                    }}
                >
                    {data.name}
                </Typography>
                <Typography
                    variant="caption"
                    color="gray"
                    noWrap
                    sx={{
                        fontStyle: "italic",
                    }}
                >
                {item.actor}
                </Typography>
            </CardContent>
        </Card>
    )
}
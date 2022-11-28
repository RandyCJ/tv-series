import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';

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
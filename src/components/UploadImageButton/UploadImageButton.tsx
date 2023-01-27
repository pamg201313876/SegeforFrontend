import React from 'react';
import DefaultImage from 'resources/images/default-image.png';
import { Button, Header, Icon, Image, Label } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

type Props = {
    defaultLabel: string
    fileNameLabel?: string
    imageBase64?: string
    onlyView?: boolean
    style?: any
    imageSize?: any
    disabled?: boolean
    name?: String
    error?: any
    handleChange?: (e: any, { name, value }: any) => void
}

export default function UploadImageFormButton({
    defaultLabel,
    fileNameLabel,
    imageBase64,
    onlyView = false,
    style,
    imageSize: propsImageSize,
    disabled,
    name,
    error: propsError,
    handleChange
}: Props) {

    const uploadInput = React.useRef<any>(null);
    const [loading] = React.useState(false)
    const [isPositive, setPositive] = React.useState<Boolean | null>(null)
    const [label] = React.useState<string>(defaultLabel)
    const [buttonLabel, setButtonLabel] = React.useState<string | undefined>(fileNameLabel !== undefined ? fileNameLabel : "Subir Imagen")
    const [icon, setIcon] = React.useState<SemanticICONS>("upload")
    const [showClearButton, setShowClearButton] = React.useState<boolean>(false)
    const [image, setImage] = React.useState<String>(imageBase64 != null ? imageBase64 : DefaultImage)
    const [imageSize] = React.useState<any>(propsImageSize !== undefined ? propsImageSize : 'medium');
    const [error, setError] = React.useState<any>(propsError);
    const handleChangeCallback = React.useCallback(handleChange !== undefined ? handleChange : () => { }, []);

    const convertImageToBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let imageBase64 = reader.result as string;
            setImage(imageBase64);
        };
        reader.onerror = function (error) {
            setImage(DefaultImage);
        };
    }

    const handleClick = () => {
        if (uploadInput != null) {
            let current = uploadInput.current
            if (current != null) {
                current.click()
            }
        }
    }

    const clearFileUpload = () => {
        setPositive(null)
        setButtonLabel(fileNameLabel !== undefined ? fileNameLabel : "Subir Imagen")
        setIcon("upload")
        setShowClearButton(false)
        let current = uploadInput.current;
        current.value = null;
        setImage(DefaultImage);
    }

    const fileUpload = (e: any) => {
        if (e.target.files != null && e.target.files.length > 0) {
            setPositive(true)
            setButtonLabel(e.target.files[0].name)
            setIcon("check")
            setShowClearButton(true)
            convertImageToBase64(e.target.files[0])
        }
    }

    React.useEffect(() => {
        let value = image === DefaultImage ? "" : image;
        handleChangeCallback(null, { name, value })
    }, [image, name, handleChangeCallback])

    React.useEffect(() => {
        setImage(imageBase64 ? imageBase64 : DefaultImage);
    }, [imageBase64])

    React.useEffect(() => {
        setError(propsError)
    }, [propsError])
    return (
        <div style={style} >
            <Header size="small" >{label}</Header>
            {onlyView === false ?
                <Header size="tiny" style={{ marginTop: -8 }}>Click para subir imagen</Header>
                : null
            }
            <div style={{ display: 'flex', alignItems: "flex-end" }}>
                <Image
                    src={image}
                    size={imageSize}
                    style={onlyView === false ? { cursor: "pointer" } : { marginTop: 10, marginBottom: 10 }}
                    onClick={onlyView === false ? handleClick : null}
                />
                {showClearButton &&
                    (<Button color="red" onClick={clearFileUpload} icon style={{ marginLeft: 4 }} >
                        <Icon name={"trash"} />
                    </Button>)}
            </div>

            {/* {isOnlyView && 
                    (<ButtonGroup>
                        <Button disabled={disabled != null ? disabled : false} style={style} positive={isPositive === true} negative={isPositive === false} loading={loading} onClick={handleClick}>
                            <Icon size="large" name={icon} />
                            {buttonLabel}
                        </Button>		
                        {showClearButton && 
                        (<Button onClick={clearFileUpload}>
                            <Icon name={"trash"} />
                        </Button>)}		
                    </ButtonGroup>)} */}

            <input
                ref={uploadInput}
                type="file"
                accept="image/jpeg, image/png"
                hidden
                onChange={fileUpload}
            />
            <div>
                {error != null && <Label basic color='red' pointing>
                    {error}
                </Label>}
            </div>
        </div>

    )
}

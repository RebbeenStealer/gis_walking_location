import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

const mapConfig = {
    useKakaoLoader(){
        useKakaoLoaderOrigin({
            // appkey: "133a147821bce4bce58bbc4cb446e46b",
            appkey: "82b7b63771f3a941992c275525c649df",

            libraries: ["clusterer", "drawing", "services"]
        })
    }
}

export default mapConfig;
import React, { useEffect, useState } from 'react';

const LazyImage=({url,alt})=>  {
    //url이랑 alt를 받아오고
    const [isLoading,setIsLoading] = useState(true)
    // 처음에는 true
    const [opacity,setOpacity] =useState('opacity-0');

    useEffect(()=>{
        isLoading ?  setOpacity('opacity-0') : setOpacity('opacity-100');
    },[isLoading ])
    return (
      <>
        {isLoading && (
          <div className="absolute h-full z-10 w-full flex items-center justify-center">
            ...loading
          </div>
        )}
        <img
          src={url}
          alt={alt}
          width="100%"
          height="auto"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          //다 로드가 되면 호출이시작됨, false로 하면 ...로딩이 안보임
          className={`object-contain h-full ${opacity}`}
        />
      </>
    );
}

export default LazyImage;
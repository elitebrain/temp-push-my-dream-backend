import React from "react";

const Pixel = () => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            console.log("b.getElementsByTagName(e)", b.getElementsByTagName(e));
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '530255477678641');
            fbq('track', 'PageView');`
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=530255477678641&ev=PageView&noscript=1" />`
        }}
      ></noscript>
      {/* <script
        async
        src="https://www.facebook.com/signals/iwl.js?pixel_id=520982495231381"
      /> */}
    </>
  );
};

export default Pixel;
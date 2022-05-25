import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="268" rx="15" ry="15" width="279" height="22" />
        <rect x="4" y="312" rx="10" ry="10" width="275" height="73" />
        <rect x="5" y="420" rx="10" ry="10" width="100" height="30" />
        <rect x="125" y="409" rx="25" ry="25" width="152" height="50" />
        <circle cx="137" cy="127" r="125" />
    </ContentLoader>
);

export default Skeleton;

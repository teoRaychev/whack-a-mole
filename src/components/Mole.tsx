import React from "react";

export const Mole: React.FC<{ 
    visible: boolean; 
    onClick: () => void; 
    /*gridCellRef: React.RefObject<HTMLDivElement>*/}>= 
    ({
        visible,
        onClick,
        /*gridCellRef*/ }) => 
    {
        return (
        <div 
            className={`mole ${visible ? 'visible': '' }`}
           /*ref={gridCellRef}*/
            onClick ={onClick}>
        </div>
    );
};
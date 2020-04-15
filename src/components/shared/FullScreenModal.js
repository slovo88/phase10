import React from 'react'

function FullScreenModal({ closeModal, children }) {
    return (
        <div style={{position: "fixed", top:0, bottom:0, left: 0, right: 0, backgroundColor: "#282c34",zIndex:10,overflowY:"scroll", paddingBottom:"50px"}}>
            <div style={{height: "20px", top: 0,}}>
                <div style={{position: "absolute", right:0, padding: "10px", fontWeight: "bold"}} onClick={closeModal}>X</div>
            </div>
            {children}
        </div>
    )
}

export default FullScreenModal
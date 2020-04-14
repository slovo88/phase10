import React from 'react'

function FullScreenModal({ toggleModal, children }) {
    return (
        <div style={{position: "fixed", top:0, bottom:0, left: 0, right: 0, backgroundColor: "#b2b",}}>
            <div style={{height: "50px", top: 0,}}>
                <div style={{position: "absolute", right:10, padding: "15px"}} onClick={() => toggleModal(false)}>X</div>
            </div>
            {children}
        </div>
    )
}

export default FullScreenModal
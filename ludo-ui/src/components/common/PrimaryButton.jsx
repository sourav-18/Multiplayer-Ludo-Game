import React from 'react'
import Button from "../ui/Button";

function PrimaryButton({name,handler}) {
    return (
        <div className="mt-10 flex gap-5">
            <Button onClick={handler}>
                {name}
            </Button>
        </div>
    )
}

export default PrimaryButton
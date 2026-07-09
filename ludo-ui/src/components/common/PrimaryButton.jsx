import React from 'react'
import Button from "../ui/Button";

function PrimaryButton({name,handler}) {
    return (
        <div className="mt-3 flex gap-5">
            <Button onClick={handler} className='cursor-pointer'>
                {name}
            </Button>
        </div>
    )
}

export default PrimaryButton
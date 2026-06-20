import React from 'react'
import blueToken from "../../assets/blue_token.png";
import yellowToken from "../../assets/yellow_token.png";

function LastHalf() {
    return (
        <div class="last-half equal-up-down">
            <div class="player-spot ps3">
                <div class="player p3">
                    <div class="disks p3-disk bluePath0"><img src={blueToken} class="blueToken"
                        alt="blue token " name="blueToken" id="blueToken1"/></div>
                    <div class="disks p3-disk bluePath0"><img src={blueToken} class="blueToken"
                        alt="blue token " name="blueToken" id="blueToken2"/></div>
                    <div class="disks p3-disk bluePath0"><img src={blueToken} class="blueToken"
                        alt="blue token " name="blueToken" id="blueToken3"/></div>
                    <div class="disks p3-disk bluePath0"><img src={blueToken} class="blueToken"
                        alt="blue token " name="blueToken" id="blueToken4"/></div>
                </div>
            </div>
            <div class="vertical-path">
                <div class="cube-move-spot RGYB bluePath5 yellowPath18 greenPath31 redPath44"></div>
                <div class="cube-move-spot blue-spot B bluePath56"></div>
                <div class="cube-move-spot RGYB bluePath45 yellowPath6 greenPath19 redPath32"></div>
                <div class="cube-move-spot RGYB bluePath4 yellowPath17 greenPath30 redPath43"></div>
                <div class="cube-move-spot blue-spot B bluePath55"></div>
                <div class="cube-move-spot RGYB bluePath46 yellowPath7 greenPath20 redPath33"></div>
                <div class="cube-move-spot RGYB bluePath3 yellowPath16 greenPath29 redPath42"></div>
                <div class="cube-move-spot blue-spot B bluePath54"></div>
                <div class="cube-move-spot RGYB bluePath47 yellowPath8 greenPath21 redPath34"></div>
                <div class="cube-move-spot RGYB bluePath2 yellowPath15 greenPath28 redPath41"></div>
                <div class="cube-move-spot blue-spot B bluePath53"></div>
                <div class="cube-move-spot RGYB star-place bluePath48 yellowPath9 greenPath22 redPath35"></div>
                <div class="cube-move-spot tokenStart blue-spot RGYB bluePath1 yellowPath14 greenPath27 redPath40">
                </div>
                <div class="cube-move-spot blue-spot B bluePath52"></div>
                <div class="cube-move-spot RGYB bluePath49 yellowPath10 greenPath23 redPath36"></div>
                <div class="cube-move-spot R  G Y greenPath26 redPath39 yellowPath13"></div>
                <div class="cube-move-spot RGYB bluePath51 yellowPath12 greenPath25 redPath38"></div>
                <div class="cube-move-spot RGYB bluePath50 yellowPath11 greenPath24 redPath37"></div>
            </div>

            <div class="player-spot ps4">
                <div class="player p4">
                    <div class="disks p4-disk yellowPath0"><img src={yellowToken} class="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken1"/></div>
                    <div class="disks p4-disk yellowPath0"><img src={yellowToken} class="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken2"/></div>
                    <div class="disks p4-disk yellowPath0"><img src={yellowToken} class="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken3"/></div>
                    <div class="disks p4-disk yellowPath0"><img src={yellowToken} class="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken4"/></div>
                </div>
            </div>
        </div>
    )
}

export default LastHalf
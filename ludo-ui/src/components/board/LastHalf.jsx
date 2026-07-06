import React from 'react'
import blueToken from "../../assets/blue_token.png";
import yellowToken from "../../assets/yellow_token.png";
import Avatar from '../common/Avatar';
import DiceMini from './DiceMini';
import PlayerCard from '../common/PlayerCard';

function LastHalf({ handlePawnMove }) {
    return (
        <div className="last-half equal-up-down">
            <div className="player-spot ps3 relative">
                <PlayerCard classNames='left-0 -bottom-[30px] rounded-b-lg' color="blue" />
                <div className='absolute'><DiceMini color="blue" /></div>
                <div className="player p3">
                    <div className="disks p3-disk bluePath0 blue-home-one"><img src={blueToken} className="blueToken one-blue cursor-pointer"
                        onClick={() => handlePawnMove("one-blue")}
                        alt="blue token " name="blueToken" id="blueToken1" /></div>
                    <div className="disks p3-disk bluePath0 blue-home-two"><img src={blueToken} className="blueToken two-blue cursor-pointer"
                        onClick={() => handlePawnMove("two-blue")}
                        alt="blue token " name="blueToken" id="blueToken2" /></div>
                    <div className="disks p3-disk bluePath0 blue-home-three"><img src={blueToken} className="blueToken three-blue cursor-pointer"
                        onClick={() => handlePawnMove("three-blue")}
                        alt="blue token " name="blueToken" id="blueToken3" /></div>
                    <div className="disks p3-disk bluePath0 blue-home-four"><img src={blueToken} className="blueToken four-blue cursor-pointer"
                        onClick={() => handlePawnMove("four-blue")}
                        alt="blue token " name="blueToken" id="blueToken4" /></div>
                </div>
            </div>
            <div className="vertical-path">
                <div className="cube-move-spot RGYB bluePath5 yellowPath18 greenPath31 redPath44 common-44"></div>
                <div className="cube-move-spot blue-spot B bluePath56 blue-home-5"></div>
                <div className="cube-move-spot RGYB bluePath45 yellowPath6 greenPath19 redPath32 common-32"></div>
                <div className="cube-move-spot RGYB bluePath4 yellowPath17 greenPath30 redPath43 common-43"></div>
                <div className="cube-move-spot blue-spot B bluePath55 blue-home-4"></div>
                <div className="cube-move-spot RGYB bluePath46 yellowPath7 greenPath20 redPath33 common-33"></div>
                <div className="cube-move-spot RGYB bluePath3 yellowPath16 greenPath29 redPath42 common-42"></div>
                <div className="cube-move-spot blue-spot B bluePath54 blue-home-3"></div>
                <div className="cube-move-spot RGYB bluePath47 yellowPath8 greenPath21 redPath34 common-34"></div>
                <div className="cube-move-spot RGYB bluePath2 yellowPath15 greenPath28 redPath41 common-41"></div>
                <div className="cube-move-spot blue-spot B bluePath53 blue-home-2"></div>
                <div className="cube-move-spot RGYB star-place bluePath48 yellowPath9 greenPath22 redPath35 common-35"></div>
                <div className="cube-move-spot tokenStart blue-spot RGYB bluePath1 yellowPath14 greenPath27 redPath40 common-40">
                </div>
                <div className="cube-move-spot blue-spot B bluePath52 blue-home-1"></div>
                <div className="cube-move-spot RGYB bluePath49 yellowPath10 greenPath23 redPath36 common-36"></div>
                <div className="cube-move-spot R  G Y greenPath26 redPath39 yellowPath13 common-39"></div>
                <div className="cube-move-spot RGYB bluePath51 yellowPath12 greenPath25 redPath38 common-38"></div>
                <div className="cube-move-spot RGYB bluePath50 yellowPath11 greenPath24 redPath37 common-37"></div>
            </div>

            <div className="player-spot ps4 relative">
                <PlayerCard classNames='left-0 -bottom-[30px] rounded-b-lg' color="yellow" />
                <div className='absolute'><DiceMini color="yellow" /></div>
                <div className="player p4">
                    <div className="disks p4-disk yellowPath0 yellow-home-one"><img src={yellowToken} className="yellowToken one-yellow cursor-pointer"
                        onClick={() => handlePawnMove("one-yellow")}
                        alt="yellow token" name="yellowToken" id="yellowToken1" /></div>
                    <div className="disks p4-disk yellowPath0 yellow-home-two"><img src={yellowToken} className="yellowToken two-yellow cursor-pointer"
                        onClick={() => handlePawnMove("two-yellow")}
                        alt="yellow token" name="yellowToken" id="yellowToken2" /></div>
                    <div className="disks p4-disk yellowPath0 yellow-home-three"><img src={yellowToken} className="yellowToken three-yellow cursor-pointer"
                        onClick={() => handlePawnMove("three-yellow")}
                        alt="yellow token" name="yellowToken" id="yellowToken3" /></div>
                    <div className="disks p4-disk yellowPath0 yellow-home-four"><img src={yellowToken} className="yellowToken four-yellow cursor-pointer"
                        onClick={() => handlePawnMove("four-yellow")}
                        alt="yellow token" name="yellowToken" id="yellowToken4" /></div>
                </div>
            </div>
        </div>
    )
}

export default LastHalf
import React, { useEffect } from 'react'
import redToken from "../../assets/red_token.png";
import greenToken from "../../assets/green_token.png";
import Avatar from '../common/Avatar';
import { AllState } from '../../context/Context';
import DiceMini from './DiceMini';

function FirstHalf({ handlePawnMove }) {
    // const { state: { currentPawnState } } = AllState();

    // useEffect(() => {
    //     console.log(currentPawnState)
    // }, [currentPawnState])
    return (
        <div className="1st-half equal-up-down">
            <div className="player-spot ps1 relative">
                <Avatar classNames='-left-25 top-3' id='red-avatar' />
                <div className='absolute'><DiceMini color="red"/></div>
                <div className="player p1">
                    <div className="disks p1-disk redPath0 red-home-one"><img src={redToken} className="redToken one-red cursor-pointer" alt="red token "
                        onClick={() => handlePawnMove("one-red")}
                        name="redToken" id="redToken1" /></div>
                    <div className="disks p1-disk redPath0 red-home-two"><img src={redToken} className="redToken two-red cursor-pointer" alt="red token "
                        onClick={() => handlePawnMove("two-red")}
                        name="redToken" id="redToken2" /></div>
                    <div className="disks p1-disk redPath0 red-home-three"><img src={redToken} className="redToken three-red cursor-pointer" alt="red token "
                        onClick={() => handlePawnMove("three-red")}
                        name="redToken" id="redToken3" /></div>
                    <div className="disks p1-disk redPath0 red-home-four"><img src={redToken} className="redToken four-red cursor-pointer" alt="red token "
                        onClick={() => handlePawnMove("four-red")}
                        name="redToken" id="redToken4" /></div>
                </div>
            </div>
            <div className="vertical-path">
                <div className="cube-move-spot RGYB bluePath24 yellowPath37 greenPath50 redPath11 common-11"></div>
                <div className="cube-move-spot RGYB bluePath25 yellowPath38 greenPath51 redPath12 common-12"></div>
                <div className="cube-move-spot RYB bluePath26 yellowPath39 redPath13 common-13"></div>
                <div className="cube-move-spot  RGYB bluePath23 yellowPath36 greenPath49 redPath10 common-10"></div>
                <div className="cube-move-spot green-spot G greenPath52 green-home-1"></div>
                <div className="cube-move-spot tokenStart green-spot RGYB bluePath27 yellowPath40 greenPath1 redPath14 common-14">
                </div>
                <div className="cube-move-spot star-place RGYB bluePath22 yellowPath35 greenPath48 redPath9 common-9"></div>
                <div className="cube-move-spot green-spot G greenPath53 green-home-2"></div>
                <div className="cube-move-spot RGYB bluePath28 yellowPath41 greenPath2 redPath15 common-15"></div>
                <div className="cube-move-spot RGYB bluePath21 yellowPath34 greenPath47 redPath8 common-8"></div>
                <div className="cube-move-spot green-spot G greenPath54 green-home-3"></div>
                <div className="cube-move-spot RGYB bluePath29 yellowPath42 greenPath3 redPath16 common-16"></div>
                <div className="cube-move-spot RGYB bluePath20 yellowPath33 greenPath46 redPath7 common-7"></div>
                <div className="cube-move-spot green-spot G greenPath55 green-home-4"></div>
                <div className="cube-move-spot RGYB bluePath30 yellowPath43 greenPath4 redPath17 common-17"></div>
                <div className="cube-move-spot RGYB bluePath19 yellowPath32 greenPath45 redPath6 common-6"></div>
                <div className="cube-move-spot green-spot G greenPath56 green-home-5"></div>
                <div className="cube-move-spot RGYB bluePath31 yellowPath44 greenPath5 redPath18 common-18"></div>
            </div>

            <div className="player-spot ps2 relative">
                <Avatar classNames='-right-25 top-3' id='green-avatar' />
                <div className='absolute'><DiceMini color="green"/></div>
                <div className="player p2">
                    <div className="disks p2-disk greenPath0 green-home-one"><img src={greenToken} className="greenToken one-green cursor-pointer"
                        onClick={() => handlePawnMove("one-green")}
                        alt="green token " name="greenToken" id="greenToken1" /></div>
                    <div className="disks p2-disk greenPath0 green-home-two"><img src={greenToken} className="greenToken two-green cursor-pointer"
                        onClick={() => handlePawnMove("two-green")}
                        alt="green token " name="greenToken" id="greenToken2" /></div>
                    <div className="disks p2-disk greenPath0 green-home-three"><img src={greenToken} className="greenToken three-green cursor-pointer"
                        onClick={() => handlePawnMove("three-green")}
                        alt="green token " name="greenToken" id="greenToken3" /></div>
                    <div className="disks p2-disk greenPath0 green-home-four"><img src={greenToken} className="greenToken four-green cursor-pointer"
                        onClick={() => handlePawnMove("four-green")}
                        alt="green token " name="greenToken" id="greenToken4" /></div>
                </div>
            </div>
        </div>
    )
}

export default FirstHalf
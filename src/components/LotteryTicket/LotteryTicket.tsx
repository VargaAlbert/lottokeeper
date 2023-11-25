import { useState } from "react";
import { useLottoContext, LOTTERY_NUMBER } from "../../contextAPI/LottoContext";
import { FaArrowRotateLeft, FaComputer } from "react-icons/fa6";

import TicketModalLowakcse from "./TicketModal/TicketModalLowakcse";
import TicketModalFewnumbers from "./TicketModal/TicketModalFewnumbers";

import xImg from "../../img/x.png"
import style from "./LotteryTicket.module.scss";

type Props = {
    id: string
}

const LotteryTicket: React.FC<Props> = ({ id }) => {

    const {
        LotteryTicketGridNumbers,
        setLottoObject,
        addLotteryNumber,
        moneyTransaction,
        getMoney,
    } = useLottoContext();

    const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
    const [clickCounter, setClickCounter] = useState<number>(1);

    const [showLowakcse, setShowLowakcse] = useState<boolean>(false);
    const [showFlewnumbers, setShowFlewnumbers] = useState<boolean>(false);

    const addNumber = (lotteryNumber: number) => {
        setLotteryNumbers((prevNumbers) => {
            if (!prevNumbers.includes(lotteryNumber) && prevNumbers.length < LOTTERY_NUMBER) {
                return [...prevNumbers, lotteryNumber];
            } else {
                return prevNumbers;
            }
        });
    };

    const removeNumber = (lotteryNumber: number) => {
        setLotteryNumbers((prevNumbers) => prevNumbers.filter((num) => num !== lotteryNumber));
    };

    const checked = (lotteryNumber: number) => {

        if (lotteryNumbers.includes(lotteryNumber)) {
            removeNumber(lotteryNumber);
        } else {
            addNumber(lotteryNumber);
        }
    }

    const LotteryTicketContentTSX = (lotteryNumber: number) => {
        if (lotteryNumbers.includes(lotteryNumber)) {
            return (
                <>
                    <span className={style.number}>{lotteryNumber}</span>
                    <img className={style.xImg} src={xImg} alt="x" />
                </>
            );
        } else if (lotteryNumbers.length === LOTTERY_NUMBER) {
            return <span className={style.full}>{lotteryNumber}</span>
        } else {
            return <span >{lotteryNumber}</span>
        }
    }

    const computerLottoNumbers = () => {
        setLotteryNumbers(addLotteryNumber());
    }

    const resetLottoNumbers = () => {
        setLotteryNumbers([])
    }


    const givesValue = () => {
        if (lotteryNumbers.length === LOTTERY_NUMBER) {
            if ((getMoney(id)) >= 500) {
                setLottoObject(id, lotteryNumbers)
                moneyTransaction(id, 500, "collector");
                setLotteryNumbers([])
            } else {
                handleShowLowakcse()
            }
        }
    }

    const handleShowLowakcse = () => setShowLowakcse(true);

    const handleShowFlewnumbers = () => setShowFlewnumbers(false);

    const ticketSubmit = () => {
        givesValue();
        setClickCounter(clickCounter + 1)
        if (clickCounter % 5 === 0) {
            setShowFlewnumbers(true);
        }
    }

    return (
        <section className={style.mainContainer}>
            <div className={style.ticketHead} >
                <h2>Lottó jegy</h2>
            </div>
            <div className={style.numberContainer}>
                {LotteryTicketGridNumbers.map((number) => {
                    return (<div
                        key={number}
                        className={style.number}
                        onClick={() => { checked(number) }}>
                        {LotteryTicketContentTSX(number)}
                    </div>);
                })}
            </div>
            <div className={style.btnContainer}>
                <FaComputer onClick={computerLottoNumbers} className={style.icon} />
                <button onClick={ticketSubmit}>Beküld</button>
                <FaArrowRotateLeft onClick={resetLottoNumbers} className={style.icon} />
            </div>
            < TicketModalLowakcse
                handleClose={handleShowLowakcse}
                show={showLowakcse}
                id={id} />
            < TicketModalFewnumbers
                handleClose={handleShowFlewnumbers}
                show={showFlewnumbers}
                lotteryNumbersLength={lotteryNumbers.length} />
        </section>
    );
}

export default LotteryTicket;

import style from "./LotteryTicketList.module.scss";
import { useLottoContext } from "../../contextAPI/LottoContext";
import { useMemo } from "react";

type Props = {
    id: string
}

const LotteryTicketList: React.FC<Props> = ({ id }) => {

    const { lottoLotteryNumber } = useLottoContext();

    const lotteryTicketList = useMemo(() => {

        const copyData = id
            ? [...lottoLotteryNumber].filter((Ticket) => Ticket.owner === id)
            : [...lottoLotteryNumber].filter((Ticket) => Ticket.lottoId > 0).sort((b, a) => a.owner.localeCompare(b.owner));

        return copyData

    }, [lottoLotteryNumber, id]);


    if (lotteryTicketList.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
                {lotteryTicketList.map((ticket) => {
                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>
                            <div className={style.ticketTitleCont}>
                                <div>ID: {ticket.owner}</div>
                                <div>Sorszám:</div>
                                <div className={style.lottoId}>{ticket.lottoId}.</div>
                            </div>
                            <div className={style.lotteryNumberContainer}>
                                {ticket.LotteryNumbers.sort((a, b) => a - b).map((number) => {
                                    return (
                                        <div key={number} className={style.lotteryNumber}>
                                            {`${number}`}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        if (id) {
            return (
                <div className={style.lotteryListContainer}>
                    <h3>Még nem adtál fel szelvéynt!</h3>
                </div>
            );
        } else {
            return (
                <div className={style.lotteryListContainer}>
                    <h3>Még nincs szelvény fel adva!</h3>
                </div>
            )
        }
    }
}

export default LotteryTicketList;
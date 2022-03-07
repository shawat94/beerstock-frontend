import styles from '../TapItem.module.css'
import BottleIcon from './BottleIcon'
import DrinkButton from './DrinkButton'
import RemoveButton from './RemoveButton'

export const TapItem = ({ tap, taps, setTaps }) => {
    return (
        <div>
            <table className={styles.TapTable}>
                <colgroup>
                    <col style={{span: "1", width: "20%"}} />
                    <col style={{span: "1", width: "10%"}} />
                    <col style={{span: "1", width: "10%"}} />
                    <col style={{span: "1", width: "60%"}} />
                </colgroup>

                <tr className={styles.TapTableRow}>
                    <td className={styles.TapTableDetailsColumn}>
                        <div className={styles.TapTableNameBrewerySet}>
                            <p className={styles.TapTableNameFont}>{tap.name}</p>
                            {tap.brewery && <p className={styles.TapTableBreweryFont}>{tap.brewery}</p>}
                        </div>
                        <div className={styles.TapTableButton}>
                            <RemoveButton className={styles.TapTableButton} tap={tap} taps={taps} setTaps={setTaps} />
                        </div>
                        <div className={styles.TapTableButton}>
                            <DrinkButton className={styles.TapTableButton} tap={tap} taps={taps} setTaps={setTaps} />
                        </div>
                    </td>
                    <td>
                        <p className={styles.TapTableStyleFont}>{tap.style}</p>
                        <p className={styles.TapTableAbvIbuFont}>
                            ABV: {tap.abv}%<br />
                            IBU: {tap.ibu}<br />
                            Rem: {tap.remaining}
                        </p>
                    </td>
                    <td>
                        {<BottleIcon inputColor={tap.color} inputShape={tap.type} />}
                    </td>
                    <td className={styles.TapTableDescColumn}>
                        <p className={styles.TapTableDescFont}>{tap.description}</p>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default TapItem
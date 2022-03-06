import styles from './tap_item.module.css'
import BottleIcon from './bottleicons'
import { ReactComponent as BottleLogo } from './Bottle.svg'

export const tapitem = (tap) => {
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
                        <p className={styles.TapTableNameFont}>{tap['name']}</p>
                            {tap['brewery'] != 'undefined' && 
                            <p className={styles.TapTableBreweryFont}>
                                {tap['brewery']}
                            </p>
                            }
                    </td>
                    <td>
                        <p className={styles.TapTableStyleFont}>{tap['style']}</p>
                        <p className={styles.TapTableAbvIbuFont}>
                            ABV: {tap['abv']}%<br />
                            IBU: {tap['ibu']}
                        </p>
                    </td>
                    <td>
                        {tap['type'] === 'bottle' && <BottleIcon />}
                    </td>
                    <td className={styles.TapTableDescColumn}>
                        <p className={styles.TapTableDescFont}>{tap['description']}</p>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default tapitem
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Desktop3.module.css';
import axios from 'axios';


const Desktop3 = () => {
  const navigate = useNavigate();
  const initialData = [
    { id: "External Sales", values: [0.000, 0.000, 0.000] },
    { id: "Merchant Sales", values: [0.000, 0.000, 0.000] },
    { id: "Transaction", values: [0.000, 0.000, 0.000] },
    { id: "Applications", values: [0.000, 0.000, 0.000] },
    { id: "Payment Rate", values: [0.000, 0.000, 0.000] },
    { id: "Credit Penetration", values: [0.000, 0.000, 0.000] },
    { id: "Approval Rate", values: [0.000, 0.000, 0.000] },
    { id: "Active Rate", values: [0.000, 0.000, 0.000] },
    { id: "Floating APR", values: [0.000, 0.000, 0.000] },
    { id: "Fixed APR", values: [0.000, 0.000, 0.000] },
    { id: "Promo APR", values: [0.000, 0.000, 0.000] },
    // Add more rows as needed
  ];

  const [rowData, setRowData] = useState(initialData);

  const onVectorClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const handleUpdateAllRows = async () => {
    try {
      const updatedData = rowData.map((row) => ({
        id: row.id,
        values: row.values.map((value) => parseFloat(value))
      }));

      const response = await fetch('http://127.0.0.1:5000/calcm', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }).then((response) => response.json());

      setData(response);
      console.log('All rows updated successfully');
    } catch (error) {
      console.error('Error updating rows:', error);
    }
  };

  const handleInputChange = (rowId, columnIndex, value) => {
    setRowData((prevData) => {
      return prevData.map((row) => {
        if (row.id === rowId) {
          const updatedValues = [...row.values];
          updatedValues[columnIndex] = isNaN(value) ? 0 : value;
          return { ...row, values: updatedValues };
        }
        return row;
      });
    });
  };

  const [data, setData] = useState({});

  const fetchData = () => {
    axios.get('http://127.0.0.1:5000/calcm')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching updated data:', error);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <>
    <img className={styles.vectorIcon} alt="" src="/vector.png"  onClick={onVectorClick} />
      <div className="container clearfix">
        <div className={styles.left_panel}>
          <h2>Enter the Input Parameters for Simulation</h2>
          <h4>Enter percentage change; Example for 15% change, enter 0.15 for -20% change, enter -0.20 etc.</h4>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Year 1</th>
                <th>Year 2</th>
                <th>Year 3</th>
              </tr>
            </thead>
            <tbody>
              {rowData.slice(0, 4).map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  {row.values.map((value, index) => (
                    <td key={index}>
                      <input
                        value={value}
                        onChange={(e) => handleInputChange(row.id, index, (e.target.value))}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>

        <div className={styles.left_panel1}>
        <h4>Enter basis point (bps) increase or decrease that will be added or subtracted; Example for 1% increase enter 100, for 5% decrease, enter -500</h4>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Year 1</th>
                <th>Year 2</th>
                <th>Year 3</th>
              </tr>
            </thead>
            <tbody>
              {rowData.slice(4).map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  {row.values.map((value, index) => (
                    <td key={index}>
                      <input
                        value={value}
                        onChange={(e) => handleInputChange(row.id, index, (e.target.value))}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleUpdateAllRows}>Simulate</button>
          <p>{rowData.message}</p>
        </div>


        <div className={styles.right_panel}>
        <h2>Simulated Results based on the Input Parameters</h2>
          <table>
            <thead>
              <tr>
                <td><b>Parameter</b></td>
                <td><b>Baseline Year</b></td>
                <td><b>Year-1</b></td>
                <td><b>Year-2</b></td>
                <td><b>Year-3</b></td>
              </tr>
            </thead>
            <tbody>

              <tr>
                {/* <td className={styles.cellWithButton} >Internal Sales Summary (in $ Million)<button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Internal Sales Summary (in $ Million)</td>
                <td>{data.internal_sales_summary_bs}</td>
                <td>{data.internal_sales_summary_1}</td>
                <td>{data.internal_sales_summary_2}</td>
                <td>{data.internal_sales_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>External Sales Summary (in $ Million) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button> </td> */}
                <td>External Sales Summary (in $ Million)</td>
                <td>{data.external_sales_summary_bs}</td>
                <td>{data.external_sales_summary_1}</td>
                <td>{data.external_sales_summary_2}</td>
                <td>{data.external_sales_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Sales Summary (in $ Million) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Sales Summary (in $ Million)</td>
                <td>{data.sales_summary_bs}</td>
                <td>{data.sales_summary_1}</td>
                <td>{data.sales_summary_2}</td>
                <td>{data.sales_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Payment Rate Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Payment Rate Summary</td>
                <td>{data.payment_rate_summary_bs}</td>
                <td>{data.payment_rate_summary_1}</td>
                <td>{data.payment_rate_summary_2}</td>
                <td>{data.payment_rate_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>ENR Summary (in $ Million) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>ENR Summary (in $ Million)</td>
                <td>{data.enr_summary_bs}</td>
                <td>{data.enr_summary_1}</td>
                <td>{data.enr_summary_2}</td>
                <td>{data.enr_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>ANR Summary (in $ Million) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>ANR Summary (in $ Million)</td>
                <td>{data.anr_summary_bs}</td>
                <td>{data.anr_summary_1}</td>
                <td>{data.anr_summary_2}</td>
                <td>{data.anr_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Merchant Sales Summary (in $ Million) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Merchant Sales Summary (in $ Million)</td>
                <td>{data.merchant_sales_summary_bs}</td>
                <td>{data.merchant_sales_summary_1}</td>
                <td>{data.merchant_sales_summary_2}</td>
                <td>{data.merchant_sales_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Credit Penetration Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Credit Penetration Summary</td>
                <td>{data.credit_penetration_summary_bs}</td>
                <td>{data.credit_penetration_summary_1}</td>
                <td>{data.credit_penetration_summary_2}</td>
                <td>{data.credit_penetration_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Transaction Summary (in 1000) <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Transaction Summary (in 1000)</td>
                <td>{data.transactions_k_summary_bs}</td>
                <td>{data.transactions_k_summary_1}</td>
                <td>{data.transactions_k_summary_2}</td>
                <td>{data.transactions_k_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Average Ticket Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Average Ticket Summary</td>
                <td>{data.average_ticket_summary_bs}</td>
                <td>{data.average_ticket_summary_1}</td>
                <td>{data.average_ticket_summary_2}</td>
                <td>{data.average_ticket_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Sales per Active Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Sales per Active Summary</td>
                <td>{data.sales_per_active_summary_bs}</td>
                <td>{data.sales_per_active_summary_1}</td>
                <td>{data.sales_per_active_summary_2}</td>
                <td>{data.sales_per_active_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Balance per Active Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Balance per Active Summary</td>
                <td>{data.balance_per_active_summary_bs}</td>
                <td>{data.balance_per_active_summary_1}</td>
                <td>{data.balance_per_active_summary_2}</td>
                <td>{data.balance_per_active_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>New Accounts Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>New Accounts Summary</td>
                <td>{data.new_accounts_summary_bs}</td>
                <td>{data.new_accounts_summary_1}</td>
                <td>{data.new_accounts_summary_2}</td>
                <td>{data.new_accounts_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>EOP Accounts Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>EOP Accounts Summary</td>
                <td>{data.eop_accounts_summary_bs}</td>
                <td>{data.eop_accounts_summary_1}</td>
                <td>{data.eop_accounts_summary_2}</td>
                <td>{data.eop_accounts_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Applications Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Applications Summary</td>
                <td>{data.applications_summary_bs}</td>
                <td>{data.applications_summary_1}</td>
                <td>{data.applications_summary_2}</td>
                <td>{data.applications_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Approval Rate Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Approval Rate Summary</td>
                <td>{data.approval_rate_summary_bs}</td>
                <td>{data.approval_rate_summary_1}</td>
                <td>{data.approval_rate_summary_2}</td>
                <td>{data.approval_rate_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Average Actives Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Average Actives Summary</td>
                <td>{data.average_actives_summary_bs}</td>
                <td>{data.average_actives_summary_1}</td>
                <td>{data.average_actives_summary_2}</td>
                <td>{data.average_actives_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Active Rate Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Active Rate Summary</td>
                <td>{data.active_rate_summary_bs}</td>
                <td>{data.active_rate_summary_1}</td>
                <td>{data.active_rate_summary_2}</td>
                <td>{data.active_rate_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Floating APR Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Floating APR Summary</td>
                <td>{data.floating_apr_summary_bs}</td>
                <td>{data.floating_apr_summary_1}</td>
                <td>{data.floating_apr_summary_2}</td>
                <td>{data.floating_apr_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Fixed APR Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Fixed APR Summary</td>
                <td>{data.fixed_apr_summary_bs}</td>
                <td>{data.fixed_apr_summary_1}</td>
                <td>{data.fixed_apr_summary_2}</td>
                <td>{data.fixed_apr_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Promo APR Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Promo APR Summary</td>
                <td>{data.promo_apr_summary_bs}</td>
                <td>{data.promo_apr_summary_1}</td>
                <td>{data.promo_apr_summary_2}</td>
                <td>{data.promo_apr_summary_3}</td>
              </tr>

              <tr>
                {/* <td className={styles.cellWithButton}>Transactors Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Transactors Summary </td>
                <td>{data.transactors_summary_bs}</td>
                <td>{data.transactors_summary_1}</td>
                <td>{data.transactors_summary_2}</td>
                <td>{data.transactors_summary_3}</td>
              </tr>
              
              <tr>
                {/* <td className={styles.cellWithButton}>Total Average Balance Summary <button className={styles.simulate} onClick={() => handleSimulateClick("internal_sales_summary")}>Charts</button></td> */}
                <td>Total Average Balance Summary</td>
                <td>{data.total_average_balance_summary_bs}</td>
                <td>{data.total_average_balance_summary_1}</td>
                <td>{data.total_average_balance_summary_2}</td>
                <td>{data.total_average_balance_summary_3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Desktop3;
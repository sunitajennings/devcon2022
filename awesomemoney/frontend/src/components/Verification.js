import { useEffect, useState } from 'react';
import VerificationResult from "./VerificationResult";

function Verification({ userGuid, memberGuid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [status, setStatus] = useState(2);

  useEffect(() => {
    if (!isLoading && (!accountNumbers || accountNumbers.length < 1) && userGuid && memberGuid) {
      loadAccountNumbers()
    }
  })

  const loadAccountNumbers = async () => {
    setIsLoading(true);
    await fetch(`/users/${userGuid}/members/${memberGuid}/verify`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error()
      })
      .then((res) => {
        console.log('verification response', res);
        setAccountNumbers(res.account_numbers);
        setStatus(status + 1);
        setJsonData(res);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError({
          code: '400',
          type: 'Bad Request',
          message: 'You don\'t have access to this premium feature.',
          link: 'https://docs.mx.com/api#verification_mx_widgets'
        })
      });
  }

  return (
    <div>
      <VerificationResult
        docsLink="https://docs.mx.com/api#verification_mx_widgets"
        jsonData={jsonData}
        error={error}
        isLoading={isLoading}
        status={status}
        tableData={{
          headers: ['Account Number', 'Routing Number'],
          rowData: accountNumbers.map(accountNumber => {
            return ({
              id: accountNumber.guid,
              cols: [
                accountNumber.account_number,
                accountNumber.routing_number,
              ]
            })
          })
        }}
        title="Account numbers"
      />
    </div>
  );
}

export default Verification;

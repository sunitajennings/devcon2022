import { Table } from '@kyper/table'
import { Text } from '@kyper/text'
import { CheckmarkFilled } from '@kyper/icon/CheckmarkFilled'
import { Code } from '@kyper/icon/Code'
import { Hamburger } from '@kyper/icon/Hamburger'
import { Spinner } from '@kyper/progressindicators'
import { useState, useEffect } from 'react';

const STATUS = {
  TRIGGER_JOB: 0,
  POLL_MEMBER_STATUS: 1,
  GET_DATA: 2
}

function VerificationResult({
  jsonData,
  docsLink,
  error,
  isLoading,
  status,
  title,
  tableData,
}) {
  const [dataView, setDataView] = useState(null);

  useEffect(() => {
    if (jsonData != null) {
      setDataView('table');
    }
  }, [jsonData])

  const loadingStatusLabel = (currentStatus, statusPoint) => {
    if (currentStatus > statusPoint) {
      return (
        <span className="ml-8"><CheckmarkFilled size={16} color="#2F73DA" /></span>
      )
    } else if (isLoading && currentStatus === statusPoint) {
      return (
        <span className="ml-8"><Spinner size={16} fgColor="#2F73DA" /></span>
      )
    }
  }

  return (
    <div>
      <div className="mx-endpoint-body">
        <div className='endpoint-details'>
          <div className="endpoint-title-url">
            <div>
              <Text as="H3" bold tag="h3">
                {title}
                {status >= STATUS.GET_DATA && (
                  loadingStatusLabel(status, STATUS.GET_DATA)
                )}
              </Text>
            </div>
            {status > STATUS.GET_DATA && !error && (
              <Text as="ParagraphSmall" color="secondary" tag="p">
                Success! We <a href={docsLink} target="_blank" rel="noreferrer">requested an account and routing number</a> from the selected institution and account. This is the account data we got:

              </Text>
            )}

            {status <= STATUS.GET_DATA && error && (
              <Text as="ParagraphSmall" color="secondary" tag="p">
                Something went wrong. See the error details below.
              </Text>

            )}

          </div>
          <div className="view-toggle">
            <div onClick={() => {
              if (jsonData != null) {
                setDataView('table')
              }
            }} className={`toggle-item ${dataView === 'table' ? ' toggle-item-selected right' : ''} ${jsonData == null ? 'toggle-item-disabled' : ''}`}>
              <Hamburger height={14} color={`${jsonData == null ? '#A8B1BD' : '#165ECC'}`} />
            </div>
            <div onClick={() => {
              if (jsonData != null) {
                setDataView('json')
              }
            }} className={`toggle-item ${dataView === 'json' ? ' toggle-item-selected left' : ''} ${jsonData == null ? 'toggle-item-disabled' : ''}`}>
              <Code height={14} color={`${jsonData == null ? '#A8B1BD' : '#165ECC'}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`mx-endpoint-table ${tableData.rowData.length > 0 ? '' : 'hidden'}`}>
        <Table className={`${dataView === 'table' ? '' : 'hidden'}`} wrapperTag="table">
          <thead>
            <tr>
              {tableData.headers.map(header => (<th key={header}>{header}</th>))}
            </tr>
          </thead>
          <tbody>
            {tableData.rowData.map(row => {
              return (
                <tr key={row.id}>
                  {row.cols.map((colItem, index) => (<td key={`${row.id}-${colItem}-${index}`}>{colItem}</td>))}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={10}>
                {`${tableData.rowData.length} rows`}
              </td>
            </tr>
          </tfoot>
        </Table>
        <div className={`${dataView === 'json' ? '' : 'hidden'}`}>
          <div className='p-16 bottom-border title-sm'>JSON</div>
          <pre>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
          <div className='bottom-pre' />
        </div>
      </div>
      <div className={`mx-endpoint-error ${error != null ? '' : 'hidden'}`}>
        <Table className='error-table' >
          <tbody>
            <tr>
              <td>
                Error code
              </td>
              <td>
                {error?.code}
              </td>
            </tr>
            <tr>
              <td>
                Type
              </td>
              <td>
                {error?.type}
              </td>
            </tr>
            <tr>
              <td>
                Message
              </td>
              <td>
                {error?.message}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}


export default VerificationResult;

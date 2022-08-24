import Verification from "./Verification";
import Header from "./Header";
import { Table } from '@kyper/table'
import { Text } from '@kyper/text'


function UserEndpoints({ userGuid, memberGuid }) {
  return (
    <div className="mb-48">
      <Header />
      <div className="mt-16 mb-24">
        <Text as="Paragraph" color="primary" tag="p">
          Here's the user and member guids for this connection.
        </Text>
      </div>
      <Table className='guid-table mt-20' >
        <tbody>
          <tr>
            <td>
              userGuid
            </td>
            <td>
              {userGuid}
            </td>
          </tr>
          <tr>
            <td>
              memberGuid
            </td>
            <td>
              {memberGuid}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="mt-16 mb-48">
        <Text as="Paragraph" color="primary" tag="p">
          We ran instant account verification to retrieve account and routing numbers associated with this connection.
        </Text>
      </div>
      <Verification userGuid={userGuid} memberGuid={memberGuid} />
    </div>
  );
}

export default UserEndpoints;

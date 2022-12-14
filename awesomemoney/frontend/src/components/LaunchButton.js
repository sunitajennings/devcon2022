import { useEffect, useRef, useState } from 'react'
import MXConnectWidget from './MXConnectWidget'
import { Button } from '@kyper/button'
import { ChevronRight } from '@kyper/icon/ChevronRight'
import { CONNECTION_STATUS } from '../constants/Connection'
import Header from "./Header"
import { Table } from '@kyper/table'
import { Dots } from '@kyper/progressindicators'
import { Text } from '@kyper/text'
import { TextInput } from '@kyper/input'
import { Trash } from '@kyper/icon/Trash'

function LaunchButton({ setUserGuid, setMemberGuid }) {
  const [connectWidgetUrl, setConnectWidgetUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputError, setInputError] = useState({
    hasError: false,
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false);
  const [latestUsers, setLatestUsers] = useState([]);
  const [userId, setUserId] = useState(null)
  const [localUserGuid, setLocalUserGuid] = useState(null)

  const userIdRef = useRef(null);

  const MAX_USERS = 50

  useEffect(() => {
    async function getLatestUser() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`/api/users`, requestOptions)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Something went wrong')
        })
        .then((res) => {
          setErrorMessage(null);
          setLatestUsers(res?.users)
        })
        .catch((error) => {
          setIsLoading(false);
          console.log('error', error);
          setErrorMessage(error.message);
        });
    }
    getLatestUser();
  }, [])

  const deleteUser = async (userGuid) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch(`/api/user/${userGuid}`, requestOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        const users = latestUsers.filter(user => user.guid !== res.user_guid)
        setLatestUsers(users)
        console.log('deleted', res)
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
        setErrorMessage(error.message);
      });
  }

  const checkUsername = (useridvalue) => {
    if (useridvalue.length < 1) {
      setInputError({
        hasError: true,
        message: 'Username cannot be empty',
      })
      return false
    }
    if (useridvalue.length !== 0 && useridvalue.length > 0) {
      setInputError({
        hasError: false,
        message: '',
      })
    }
    return true
  }

  const loadWidget = async (user_guid) => {
    setIsLoading(true);

    let body = {}

    if (user_guid) {
      body = {
        user_guid: user_guid,
      }
      setLocalUserGuid(user_guid)
    }
    else {
      body = {
        user_id: userIdRef.current.value,
      }
      setUserId(userIdRef.current.value)
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    await fetch(`/api/get_mxconnect_widget_url`, requestOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        console.log()
        throw new Error('Something went wrong (' + res.status + " " + res.statusText + ')')
      })
      .then((res) => {
        setErrorMessage(null);
        setConnectWidgetUrl(res?.widget_url?.url)
        setUserId(res?.widget_url?.user_id)
        setLocalUserGuid(res?.user_guid)
        console.log('Getting connect widget URL', res?.widget_url?.url);
        console.log(res)
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
        setErrorMessage(error.message);
      });
  }

  const userIdInputStyle = {
    paddingBottom: '16px',
    width: '14em'
  }

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger">
          <strong>Error!</strong> {errorMessage}
        </div>
      )}
      {!isLoading && connectWidgetUrl === "" && (
        <div>
          <Header />
          <div className='flex-align-column'>
            <TextInput id="userid" label="Username" name="userid" style={userIdInputStyle} ref={userIdRef}
              errorText={inputError.message}
              showErrorIcon={inputError.hasError}
              onChange={(e) => { checkUsername(e.target.value.trim()) }}

            />
            <Button onClick={(e) => {
              if (checkUsername(userIdRef.current.value.trim())) {
                loadWidget()
              }
            }
            }
              variant="primary" disabled={latestUsers.length >= MAX_USERS}>
              Get account numbers for a one-time transfer
              <ChevronRight
                color="currentColor"
                height={12}
                style={{
                  marginLeft: 8
                }}
                width={12}
              />
            </Button>
          </div>
          {
            latestUsers.length > 0 && (
              <div>
                <div className='flex-align flex-center mt-48 mb-8'>
                  <hr />
                  <Text as="ParagraphSmall" color="primary" tag="h3">
                    {`Previously Created Users (${latestUsers.length} of ${MAX_USERS})`}
                  </Text>
                </div>
                <Table className='guid-table mb-48' >
                  <tbody>
                    {latestUsers.map((user, index) => {
                      return (
                        <tr key={user.guid}>
                          <td>{index + 1}</td>
                          <td>
                            <Button onClick={(e) => {
                              if (checkUsername(user.guid.trim())) {
                                loadWidget(user.guid)
                              }
                            }}
                              variant="transparent">
                              {user.id} ({user.guid})
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )
          }
        </div>
      )}
      {connectWidgetUrl && (
        <div>
          <Table className='guid-table mt-48 mb-24' >
            <tbody>
              <tr>
                <td>
                  User
                </td>
                <td>
                  {userId} ({localUserGuid})
                </td>
              </tr>
              <tr>
                <td>
                  Test Banks
                </td>
                <td>
                  MX Bank, MX Bank (OAuth)
                </td>
              </tr>
              <tr>
                <td>
                  MX Bank Username
                </td>
                <td>
                  mxuser
                </td>
              </tr>
              <tr>
                <td>
                  MX Bank Password(s)
                </td>
                <td>
                  correct, challenge, options, image, <a href="https://docs.mx.com/api/guides/testing#test_credentials" target="_blank" rel="noreferrer">see docs for more scenarios</a>
                </td>
              </tr>
            </tbody>
          </Table>
          <MXConnectWidget
            widgetUrl={connectWidgetUrl}
            onEvent={(event) => {
              console.log('MX PostMessage: ', event.type, event.metadata)
              if (event.type === 'mx/connect/memberConnected') {
                setUserGuid(event.metadata.user_guid)
                setMemberGuid(event.metadata.member_guid)
              } else if (event.type === 'mx/connect/loaded') {
                setIsLoading(false);
              }
            }}
          />
        </div>
      )}
      {isLoading && (
        <div className="loading">
          <Dots fgColor="#2F73DA" size={32} />
        </div>
      )}
    </div>
  );
}

export default LaunchButton;

import React, {useRef} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const AccountSelector = ({ spotify, onSelect, loading, setLoading, error, setError }) => {
  const inputUser = useRef();

  const onSubmit = event => {
    event.preventDefault();
    if (!inputUser.current.value) return setError('Insert a valid user')
    onSelect({
      method: 'lastfm',
      data: {
        user: inputUser.current.value
      }
    })
  }

  return <>
    <Container>
      <Row xs={12} className="justify-content-center">
        <p>
          {
            spotify ? 'Please use your Last.fm username to continue or use spotify.'
              : 'Please use your Last.fm username to continue.'
          }
        </p>
      </Row>
      <Row className="account-selector-center">
        <Col xs={12} md={6} className="account-selector-form-col">
          <form onSubmit={onSubmit}>
            <Row>
              <Col xs={12} xl={7}>
                <input
                  onChange={() => setError(null)}
                  className="input"
                  ref={inputUser}
                  placeholder="Last.fm username" />
                <Overlay target={inputUser.current} show={!!error} placement="top">
                  {(props) => <Tooltip id="error-tooltip" {...props} >
                    {error}
                  </Tooltip>
                  }
                </Overlay>
              </Col>
              <Col xs={12} xl={5}>
                <button disabled={loading} type="submit" className="spotify-button lastfm">
                  Continue with Last.fm
                </button>
              </Col>
            </Row>
          </form>
        </Col>
        <Col className="account-selector-center-y" xs={12} md={6}>
          or
          <button disabled={loading} className="spotify-button">
            Connect with spotify
          </button>
        </Col>
      </Row>
    </Container>
  </>
};

export default AccountSelector;

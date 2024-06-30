import BuildTab from "@/components/BuildTab";
import PartsTab from "@/components/PartsTab";
import TotalPrice from "@/components/TotalPrice";
import styles from "@/styles/TabNav.module.scss";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Row,
  Tab,
} from "react-bootstrap";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.arrayBuffer());

function useBuf() {
  let { data } = useSWRImmutable(
    "https://bucket.nunawa.net/parts_latest.db",
    fetcher,
  );

  return {
    buf: data,
  };
}

function TabContainer({ buf, sql }) {
  const [dropdownButtonTitle, setDropdownButtonTitle] = useState("CPU");
  const partsTabList = [
    {
      key: "cpu",
      name: "CPU",
    },
    {
      key: "memory",
      name: "メモリ",
    },
    {
      key: "motherboard",
      name: "マザーボード",
    },
    {
      key: "gpu",
      name: "GPU",
    },
    {
      key: "ssd",
      name: "SSD",
    },
  ];

  function handleTabContainerSelect(eventKey) {
    if (eventKey === "build") {
      setDropdownButtonTitle(<TotalPrice />);
    } else {
      setDropdownButtonTitle(
        partsTabList.find((elem) => elem.key === eventKey).name,
      );
    }
  }

  return (
    <Tab.Container
      id="left-tabs"
      defaultActiveKey="cpu"
      onSelect={handleTabContainerSelect}
    >
      <Row>
        <Col sm={3}>
          <Nav
            variant="pills"
            className={"flex-column " + styles["nav-normal"]}
          >
            {partsTabList.map((value) => (
              <Nav.Item className="mb-2" key={value.key}>
                <Nav.Link eventKey={value.key}>{value.name}</Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item className="mb-2">
              <Nav.Link eventKey="build">
                <TotalPrice />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav
            className={"mb-3 justify-content-center " + styles["nav-dropdown"]}
          >
            <Dropdown>
              <Dropdown.Toggle>{dropdownButtonTitle}</Dropdown.Toggle>
              <Dropdown.Menu>
                {partsTabList.map((value) => (
                  <Dropdown.Item as={Nav.Item} key={value.key}>
                    <Nav.Link eventKey={value.key}>{value.name}</Nav.Link>
                  </Dropdown.Item>
                ))}
                <Dropdown.Item as={Nav.Item}>
                  <Nav.Link eventKey="build">
                    <TotalPrice />
                  </Nav.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {partsTabList.map((value) => (
              <Tab.Pane eventKey={value.key} key={value.key}>
                <PartsTab type={value.key} buf={buf} sql={sql} />
              </Tab.Pane>
            ))}
            <Tab.Pane eventKey="build">
              <BuildTab />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

function ToggleDarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    const mode = document.documentElement.getAttribute("data-bs-theme");

    if (mode === "light") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      setIsDarkMode(true);
    } else if (mode === "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
      setIsDarkMode(false);
    }
  }

  return (
    <Button
      className="nav-link"
      style={{
        background: "none",
        border: "none",
        display: "grid",
        placeContent: "center",
      }}
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? <BsMoonFill /> : <BsSunFill />}
    </Button>
  );
}

export default function Home() {
  const { buf } = useBuf();
  const [sql, setSql] = useState();

  if (typeof window !== "undefined") {
    window
      .initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/${file}`,
      })
      .then((SQL) => setSql(SQL));
  }

  return (
    <>
      <Navbar className="mb-3 bg-dark-subtle">
        <Container>
          <Navbar.Brand href="/">jisaku.nunawa.net</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <ToggleDarkModeButton />
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <TabContainer buf={buf} sql={sql} />
      </Container>
    </>
  );
}

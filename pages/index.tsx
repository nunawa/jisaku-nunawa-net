import BuildTab from "@/components/BuildTab";
import PartsTab from "@/components/PartsTab";
import TotalPrice from "@/components/TotalPrice";
import { themeAtom } from "@/jotai/atom";
import styles from "@/styles/TabNav.module.scss";
import { productType } from "@/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Tab,
} from "react-bootstrap";
import { BsMoonFill, BsPcDisplay, BsSunFill } from "react-icons/bs";
import initSqlJs from "sql.js";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";

const fetcher: Fetcher<ArrayBuffer, string> = (url) =>
  fetch(url).then((res) => res.arrayBuffer());

function useBuf() {
  let { data } = useSWRImmutable(
    "https://bucket.nunawa.net/parts_latest.db",
    fetcher,
  );

  return {
    buf: data,
  };
}

function TabContainer({
  buf,
  sql,
}: {
  buf: ArrayBuffer;
  sql: initSqlJs.SqlJsStatic;
}) {
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

  function handleTabContainerSelect(eventKey: string) {
    if (eventKey === "build") {
      setDropdownButtonTitle(`${(<TotalPrice />)}`);
    } else {
      setDropdownButtonTitle(
        partsTabList.find((elem) => elem.key === eventKey)!.name,
      );
    }
  }

  return (
    <Tab.Container
      id="left-tabs"
      defaultActiveKey="cpu"
      onSelect={() => handleTabContainerSelect}
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
                <PartsTab
                  type={value.key as keyof productType}
                  buf={buf}
                  sql={sql}
                />
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

function ThemeDropdown() {
  const [theme, setThemeAtom] = useAtom(themeAtom);

  useEffect(() => {
    let targetTheme = theme;

    if (theme === "default") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    if (targetTheme === "light") {
      document.documentElement.dataset.bsTheme = targetTheme;
    } else if (targetTheme === "dark") {
      document.documentElement.dataset.bsTheme = targetTheme;
    }
  }, [theme]);

  function setTheme(t: string) {
    if (t === "default") {
      const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.dataset.bsTheme = defaultTheme;
      setThemeAtom("default");
    } else if (t === "light") {
      document.documentElement.dataset.bsTheme = "light";
      setThemeAtom("light");
    } else if (t === "dark") {
      document.documentElement.dataset.bsTheme = "dark";
      setThemeAtom("dark");
    }
  }

  function ThemeIcon({ t }: { t: string }) {
    if (t === "default") {
      return <BsPcDisplay />;
    } else if (t === "light") {
      return <BsSunFill />;
    } else if (t === "dark") {
      return <BsMoonFill />;
    }
  }

  return (
    <>
      <NavDropdown title={<ThemeIcon t={theme} />}>
        <NavDropdown.Item onClick={() => setTheme("light")}>
          Light
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTheme("dark")}>
          Dark
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTheme("default")}>
          System
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default function Home() {
  const { buf } = useBuf();
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic>();

  useEffect(() => {
    (async () => {
      const SQL = await initSqlJs({
        locateFile: () =>
          new URL("sql.js/dist/sql-wasm.wasm", import.meta.url).toString(),
      });
      setSql(SQL);
    })();
  }, []);

  return (
    <>
      <Navbar className="mb-3 border-bottom">
        <Container>
          <Navbar.Brand href="/">jisaku.nunawa.net</Navbar.Brand>
          <Nav className="ms-auto">
            <ThemeDropdown />
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <TabContainer buf={buf!} sql={sql!} />
      </Container>
    </>
  );
}

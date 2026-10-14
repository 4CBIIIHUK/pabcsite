import { useEffect, useState } from "react";
import { Footer, Header } from "./components/Layout";
import { sectionMeta, type SectionId } from "./data/types";
import { findTopic, topics } from "./data/topics";
import { HomePage } from "./pages/HomePage";
import { ProblemsPage } from "./pages/ProblemsPage";
import { SectionPage } from "./pages/SectionPage";
import { TestsPage } from "./pages/TestsPage";
import { TopicPage } from "./pages/TopicPage";

const STORAGE_KEY = "pascal-prosto-progress";
const SECTION_SLUGS: Record<string, SectionId> = {
  osnova: "osnova",
  cikly: "cikly",
  massivy: "massivy",
};

type Route =
  | { name: "home" }
  | { name: "section"; section: SectionId }
  | { name: "topic"; section: SectionId; topicId: string }
  | { name: "problems"; problemId: string | null }
  | { name: "tests"; mode: "choice" | "theory" | "task" };

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (!raw) return { name: "home" };
  const parts = raw.split("/");
  if (parts[0] === "zadachi") return { name: "problems", problemId: parts[1] ?? null };
  if (parts[0] === "testy") {
    if (parts[1] === "teoriya") return { name: "tests", mode: "theory" };
    if (parts[1] === "zadachi") return { name: "tests", mode: "task" };
    return { name: "tests", mode: "choice" };
  }
  if (parts[0] in SECTION_SLUGS) {
    const section = SECTION_SLUGS[parts[0]];
    if (parts[1] && findTopic(parts[1])?.section === section) {
      return { name: "topic", section, topicId: parts[1] };
    }
    return { name: "section", section };
  }
  return { name: "home" };
}

function hashFor(route: Route) {
  if (route.name === "home") return "";
  if (route.name === "section") return `#/${sectionMeta[route.section].slug}`;
  if (route.name === "topic") return `#/${sectionMeta[route.section].slug}/${route.topicId}`;
  if (route.name === "problems") return route.problemId ? `#/zadachi/${route.problemId}` : "#/zadachi";
  if (route.mode === "theory") return "#/testy/teoriya";
  if (route.mode === "task") return "#/testy/zadachi";
  return "#/testy";
}

function getSavedProgress(): string[] {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === "string" && topics.some((topic) => topic.id === id))
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [completed, setCompleted] = useState<string[]>(getSavedProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    function handleHashChange() {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    window.addEventListener("hashchange", handleHashChange);
    if (window.location.hash) window.scrollTo({ top: 0 });
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function go(next: Route) {
    const nextHash = hashFor(next);
    if (window.location.hash === nextHash || (!window.location.hash && nextHash === "")) {
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = nextHash.replace(/^#/, "");
  }

  function goHome() {
    if (window.location.hash) window.location.hash = "";
    else {
      setRoute({ name: "home" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goNav(id: string) {
    if (id === "zadachi") go({ name: "problems", problemId: null });
    else if (id === "testy") go({ name: "tests", mode: "choice" });
    else if (id in SECTION_SLUGS) go({ name: "section", section: SECTION_SLUGS[id] });
    else goHome();
  }

  function goTopic(id: string) {
    const topic = findTopic(id);
    if (topic) go({ name: "topic", section: topic.section, topicId: topic.id });
  }

  function startLearning() {
    const next = topics.find((topic) => !completed.includes(topic.id)) ?? topics[0];
    goTopic(next.id);
  }

  function completeTopic(id: string) {
    setCompleted((current) => (current.includes(id) ? current : [...current, id]));
  }

  const activeTopic = route.name === "topic" ? findTopic(route.topicId) : undefined;

  return (
    <>
      <Header onHome={goHome} onNav={goNav} onStart={startLearning} />
      {route.name === "home" && <HomePage completed={completed} onNav={goNav} onStart={startLearning} />}
      {route.name === "section" && (
        <SectionPage section={route.section} completed={completed} onHome={goHome} onTopic={goTopic} />
      )}
      {route.name === "topic" && activeTopic && (
        <TopicPage
          key={activeTopic.id}
          topic={activeTopic}
          completed={completed}
          onTopic={goTopic}
          onSection={(section) => go({ name: "section", section })}
          onComplete={completeTopic}
        />
      )}
      {route.name === "problems" && (
        <ProblemsPage
          problemId={route.problemId}
          onHome={goHome}
          onOpen={(id) => go({ name: "problems", problemId: id })}
        />
      )}
      {route.name === "tests" && (
        <TestsPage mode={route.mode} onHome={goHome} onMode={(mode) => go({ name: "tests", mode })} />
      )}
      {route.name === "home" && (
        <Footer onHome={goHome} onStart={startLearning} onNav={goNav} hasProgress={completed.length > 0} />
      )}
    </>
  );
}

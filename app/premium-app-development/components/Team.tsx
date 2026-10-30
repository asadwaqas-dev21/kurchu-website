import Image from "next/image";
import { personFor, siteConfig, type AuthorId } from "@/app/lib/site-config";
import { ExternalArrow, SectionHead, rv } from "./ui";

/**
 * The named people behind Kurchu, from siteConfig.authors. Each card's id is the anchor that
 * article bylines and the Person schema link to (/about#<id>).
 */
export function Team() {
  const people = (Object.keys(siteConfig.authors) as AuthorId[]).map(personFor);
  return (
    <section className="section" id="team" aria-labelledby="team-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="The people"
          titleId="team-title"
          title={
            <>
              Who you&apos;ll <em>actually work with.</em>
            </>
          }
          lede="No account managers between you and the work: the person on your first call stays on your project."
        />
        <ul className="team-grid" {...rv()}>
          {people.map((person) => (
            <li className="team-card" id={person.id} key={person.id}>
              <Image src={person.image} alt={`${person.name}, ${person.jobTitle} of ${siteConfig.shortName}`} width={120} height={120} />
              <div>
                <h3>{person.name}</h3>
                <p>{person.jobTitle}</p>
                <a className="tlink" href={person.linkedin} target="_blank" rel="noopener me">
                  LinkedIn <ExternalArrow />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

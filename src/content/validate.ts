import { ServiceSchema, CaseStudySchema, LobbyArticleSchema, TeamMemberSchema, LocationSchema } from "./schema";
import { SERVICES } from "./data/services";
import { CASE_STUDIES } from "./data/case-studies";
import { LOBBY_ARTICLES } from "./data/lobby";
import { TEAM_MEMBERS } from "./data/team";
import { LOCATIONS } from "./data/locations";

export function validateAllContent(): void {
  console.log("🔒 [Avorria CI] Commencing rigorous Zod content validation...");
  let errorCount = 0;

  // 1. Validate Services
  SERVICES.forEach((service, idx) => {
    const result = ServiceSchema.safeParse(service);
    if (!result.success) {
      console.error(`❌ Validation failed for Service at index ${idx} (${service.slug || "unknown"}):`, result.error.format());
      errorCount++;
    }
  });

  // 2. Validate Case Studies
  CASE_STUDIES.forEach((cs, idx) => {
    const result = CaseStudySchema.safeParse(cs);
    if (!result.success) {
      console.error(`❌ Validation failed for Case Study at index ${idx} (${cs.slug || "unknown"}):`, result.error.format());
      errorCount++;
    }
  });

  // 3. Validate Lobby Articles
  LOBBY_ARTICLES.forEach((article, idx) => {
    const result = LobbyArticleSchema.safeParse(article);
    if (!result.success) {
      console.error(`❌ Validation failed for Lobby Article at index ${idx} (${article.slug || "unknown"}):`, result.error.format());
      errorCount++;
    }

    // Verify author exists in TEAM_MEMBERS
    const authorExists = TEAM_MEMBERS.some((m) => m.id === article.authorId);
    if (!authorExists) {
      console.error(`❌ Author "${article.authorId}" on Lobby Article "${article.slug}" does not exist in team registry!`);
      errorCount++;
    }
  });

  // 4. Validate Team Members
  TEAM_MEMBERS.forEach((member, idx) => {
    const result = TeamMemberSchema.safeParse(member);
    if (!result.success) {
      console.error(`❌ Validation failed for Team Member at index ${idx} (${member.name || "unknown"}):`, result.error.format());
      errorCount++;
    }
  });

  // 5. Validate Locations
  LOCATIONS.forEach((location, idx) => {
    const result = LocationSchema.safeParse(location);
    if (!result.success) {
      console.error(`❌ Validation failed for Location at index ${idx} (${location.code || "unknown"}):`, result.error.format());
      errorCount++;
    }
  });

  if (errorCount > 0) {
    console.error(`\n🚨 Content validation failed with ${errorCount} error(s). Halting build.`);
    process.exit(1);
  }

  console.log(`✅ [Avorria CI] Content validation passed completely:
  - Services: ${SERVICES.length} verified
  - Case Studies: ${CASE_STUDIES.length} verified
  - Lobby Articles: ${LOBBY_ARTICLES.length} verified
  - Team Members: ${TEAM_MEMBERS.length} verified
  - Locations: ${LOCATIONS.length} verified\n`);
}

// Automatically invoke if executed directly via node or tsx
validateAllContent();

export interface Member {
  id: string;
  name: string;
  title: string;
  photo: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  startDate: string;
  reportsTo?: string;
  // New metrics
  tenure?: number; // in years
  headcount?: number; // team size
  avgTenure?: number; // average team tenure in years
}

export const members: Member[] = [
  // Level 1 - Executive Team
  {
    id: "1",
    name: "Alexandra Chen",
    title: "Chief Executive Officer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra",
    email: "alexandra.chen@company.com",
    phone: "+1 (555) 100-0001",
    department: "Executive",
    location: "New York HQ",
    startDate: "2018-03-15",
    tenure: 6.8,
    headcount: 19,
    avgTenure: 3.42,
  },
  // Level 2 - Direct Reports to CEO
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Chief Technology Officer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    email: "marcus.johnson@company.com",
    phone: "+1 (555) 100-0002",
    department: "Technology",
    location: "San Francisco",
    startDate: "2019-06-20",
    reportsTo: "1",
    tenure: 4.5,
    headcount: 42,
    avgTenure: 2.15,
  },
  {
    id: "3",
    name: "Sophia Williams",
    title: "Chief Financial Officer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    email: "sophia.williams@company.com",
    phone: "+1 (555) 100-0003",
    department: "Finance",
    location: "New York HQ",
    startDate: "2018-11-10",
    reportsTo: "1",
    tenure: 5.1,
    headcount: 28,
    avgTenure: 3.75,
  },
  {
    id: "4",
    name: "David Kim",
    title: "Chief Marketing Officer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    email: "david.kim@company.com",
    phone: "+1 (555) 100-0004",
    department: "Marketing",
    location: "Chicago",
    startDate: "2020-02-15",
    reportsTo: "1",
    tenure: 3.8,
    headcount: 35,
    avgTenure: 1.92,
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    title: "Chief Operating Officer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    email: "emma.rodriguez@company.com",
    phone: "+1 (555) 100-0005",
    department: "Operations",
    location: "Austin",
    startDate: "2019-09-22",
    reportsTo: "1",
    tenure: 4.2,
    headcount: 31,
    avgTenure: 2.68,
  },
  // Level 3 - Engineering Department
  {
    id: "6",
    name: "James Wilson",
    title: "VP of Engineering",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    email: "james.wilson@company.com",
    phone: "+1 (555) 100-0006",
    department: "Engineering",
    location: "San Francisco",
    startDate: "2020-05-10",
    reportsTo: "2",
    tenure: 3.5,
    headcount: 18,
    avgTenure: 1.85,
  },
  {
    id: "7",
    name: "Olivia Brown",
    title: "VP of Product",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    email: "olivia.brown@company.com",
    phone: "+1 (555) 100-0007",
    department: "Product",
    location: "San Francisco",
    startDate: "2020-08-15",
    reportsTo: "2",
    tenure: 3.3,
    headcount: 15,
    avgTenure: 2.1,
  },
  // Level 3 - Finance Department
  {
    id: "8",
    name: "Michael Taylor",
    title: "VP of Accounting",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    email: "michael.taylor@company.com",
    phone: "+1 (555) 100-0008",
    department: "Finance",
    location: "New York HQ",
    startDate: "2019-04-12",
    reportsTo: "3",
    tenure: 4.6,
    headcount: 12,
    avgTenure: 3.2,
  },
  {
    id: "9",
    name: "Jennifer Caldwell",
    title: "VP of People",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    email: "jennifer.caldwell@company.com",
    phone: "+1 (555) 100-0009",
    department: "Human Resources",
    location: "New York HQ",
    startDate: "2019-04-10",
    reportsTo: "3",
    tenure: 4.8,
    headcount: 24,
    avgTenure: 2.54,
  },
  // Level 3 - Marketing Department
  {
    id: "10",
    name: "Daniel Lee",
    title: "VP of Digital Marketing",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    email: "daniel.lee@company.com",
    phone: "+1 (555) 100-0010",
    department: "Marketing",
    location: "Chicago",
    startDate: "2020-07-22",
    reportsTo: "4",
    tenure: 3.3,
    headcount: 14,
    avgTenure: 1.75,
  },
  {
    id: "11",
    name: "Isabella Garcia",
    title: "VP of Brand Strategy",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    email: "isabella.garcia@company.com",
    phone: "+1 (555) 100-0011",
    department: "Marketing",
    location: "Chicago",
    startDate: "2021-03-18",
    reportsTo: "4",
    tenure: 2.7,
    headcount: 8,
    avgTenure: 1.45,
  },
  // Level 4 - Engineering Teams
  {
    id: "12",
    name: "Benjamin Clark",
    title: "Engineering Director - Frontend",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin",
    email: "benjamin.clark@company.com",
    phone: "+1 (555) 100-0012",
    department: "Engineering",
    location: "San Francisco",
    startDate: "2021-06-14",
    reportsTo: "6",
    tenure: 2.4,
    headcount: 9,
    avgTenure: 1.6,
  },
  {
    id: "13",
    name: "Mia Lewis",
    title: "Engineering Director - Backend",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    email: "mia.lewis@company.com",
    phone: "+1 (555) 100-0013",
    department: "Engineering",
    location: "San Francisco",
    startDate: "2021-08-09",
    reportsTo: "6",
    tenure: 2.2,
    headcount: 7,
    avgTenure: 1.8,
  },
  {
    id: "14",
    name: "Ethan Walker",
    title: "Engineering Director - DevOps",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    email: "ethan.walker@company.com",
    phone: "+1 (555) 100-0014",
    department: "Engineering",
    location: "Remote",
    startDate: "2022-02-28",
    reportsTo: "6",
    tenure: 1.8,
    headcount: 5,
    avgTenure: 1.2,
  },
  // Level 4 - Product Teams
  {
    id: "15",
    name: "Charlotte Hall",
    title: "Product Director - Platform",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
    email: "charlotte.hall@company.com",
    phone: "+1 (555) 100-0015",
    department: "Product",
    location: "San Francisco",
    startDate: "2021-11-05",
    reportsTo: "7",
    tenure: 2.1,
    headcount: 6,
    avgTenure: 1.9,
  },
  {
    id: "16",
    name: "Lucas Allen",
    title: "Product Director - Mobile",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    email: "lucas.allen@company.com",
    phone: "+1 (555) 100-0016",
    department: "Product",
    location: "Austin",
    startDate: "2022-01-20",
    reportsTo: "7",
    tenure: 1.9,
    headcount: 4,
    avgTenure: 1.3,
  },
  // Level 5 - Individual Contributors
  {
    id: "17",
    name: "Amelia Young",
    title: "Senior Frontend Lead",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia",
    email: "amelia.young@company.com",
    phone: "+1 (555) 100-0017",
    department: "Engineering",
    location: "San Francisco",
    startDate: "2022-04-15",
    reportsTo: "12",
    tenure: 1.6,
    headcount: 3,
    avgTenure: 0.9,
  },
  {
    id: "18",
    name: "Henry King",
    title: "Senior Backend Lead",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
    email: "henry.king@company.com",
    phone: "+1 (555) 100-0018",
    department: "Engineering",
    location: "San Francisco",
    startDate: "2022-06-10",
    reportsTo: "13",
    tenure: 1.4,
    headcount: 2,
    avgTenure: 0.75,
  },
  {
    id: "19",
    name: "Evelyn Scott",
    title: "Platform Product Manager",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evelyn",
    email: "evelyn.scott@company.com",
    phone: "+1 (555) 100-0019",
    department: "Product",
    location: "San Francisco",
    startDate: "2022-09-05",
    reportsTo: "15",
    tenure: 1.2,
    headcount: 0,
    avgTenure: 0.0,
  },
  {
    id: "20",
    name: "Alexander Green",
    title: "Mobile Product Manager",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander",
    email: "alexander.green@company.com",
    phone: "+1 (555) 100-0020",
    department: "Product",
    location: "Austin",
    startDate: "2022-11-30",
    reportsTo: "16",
    tenure: 1.0,
    headcount: 0,
    avgTenure: 0.0,
  },
];

// Helper function to get all children of a node
export function getChildrenIds(memberId: string): string[] {
  const directChildren = members
    .filter((m) => m.reportsTo === memberId)
    .map((m) => m.id);

  let allChildren = [...directChildren];
  directChildren.forEach((childId) => {
    allChildren = [...allChildren, ...getChildrenIds(childId)];
  });

  return allChildren;
}

// Helper function to get node depth in hierarchy
export function getNodeDepth(memberId: string): number {
  const member = members.find((m) => m.id === memberId);
  if (!member || !member.reportsTo) return 0;
  return 1 + getNodeDepth(member.reportsTo);
}

// Tree layout algorithm
export function calculateTreeLayout(visibleNodeIds: string[]) {
  const nodeWidth = 260;
  const horizontalSpacing = 10;
  const verticalSpacing = 160;

  // Group nodes by depth level
  const nodesByLevel = new Map<number, string[]>();

  visibleNodeIds.forEach((id) => {
    const depth = getNodeDepth(id);
    if (!nodesByLevel.has(depth)) {
      nodesByLevel.set(depth, []);
    }
    nodesByLevel.get(depth)!.push(id);
  });

  // Calculate positions
  const positions = new Map<string, { x: number; y: number }>();

  // Get max depth
  const maxDepth = Math.max(...Array.from(nodesByLevel.keys()));

  // Calculate Y positions (based on depth)
  for (let depth = 0; depth <= maxDepth; depth++) {
    const nodesAtLevel = nodesByLevel.get(depth) || [];
    const y = depth * verticalSpacing;

    // Calculate total width needed for this level
    const totalWidth =
      nodesAtLevel.length * nodeWidth +
      (nodesAtLevel.length - 1) * horizontalSpacing;

    // Start X position (centered)
    const startX = -totalWidth / 2;

    // Assign X positions
    nodesAtLevel.forEach((nodeId, index) => {
      const x =
        startX + index * (nodeWidth + horizontalSpacing) + nodeWidth / 2;
      positions.set(nodeId, { x, y });
    });
  }

  return positions;
}

// Build React Flow nodes and edges
export function buildOrgChartNodes(visibleNodeIds: string[]) {
  const positions = calculateTreeLayout(visibleNodeIds);

  const nodes = visibleNodeIds.map((id) => {
    const member = members.find((m) => m.id === id)!;
    const position = positions.get(id)!;
    const hasChildren = members.some((m) => m.reportsTo === id);

    return {
      id: member.id,
      type: "orgNode" as const,
      position,
      data: {
        ...member,
        hasChildren,
        // expanded state will be added dynamically
      },
    };
  });

  // Create edges only between visible nodes
  const edges = members
    .filter(
      (member) =>
        member.reportsTo &&
        visibleNodeIds.includes(member.id) &&
        visibleNodeIds.includes(member.reportsTo)
    )
    .map((member) => ({
      id: `e${member.reportsTo}-${member.id}`,
      source: member.reportsTo!,
      target: member.id,
      type: "smoothstep" as const,
      animated: false,
    }));

  return { nodes, edges };
}

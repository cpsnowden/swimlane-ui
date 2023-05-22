import "@testing-library/jest-dom";

import { createSerializer } from "@emotion/jest";

// Snapshots should show CSS for magic MUI classes
expect.addSnapshotSerializer(createSerializer());

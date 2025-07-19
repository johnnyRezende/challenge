import Card from "@/components/Card";
import DataTable from "@/components/DataTable";

export default function Dashboard() {
  return (
    <>
      <div className="two-column-grid">
        <div className="grid-item">
          <DataTable
            title="List years with multiple winners"
            headers={["Year", "Win Count"]}
            columns={["year", "winCount"]}
            data={[
              { id: 1, year: 1986, winCount: 2 },
              { id: 2, year: 1990, winCount: 2 },
              { id: 3, year: 2015, winCount: 2 },
            ]}
            searchable={false}
          />
        </div>

        <div className="grid-item">
          <DataTable
            title="Top 3 studios with winners"
            headers={["name", "Win Count"]}
            columns={["name", "winCount"]}
            data={[
              { id: 1, name: "Columbia Pictures", winCount: 6 },
              { id: 2, name: "Paramount Pictures", winCount: 6 },
              { id: 3, name: "Warner Bros.", winCount: 5 },
            ]}
            searchable={false}
          />
        </div>

        <div className="grid-item">
          <Card title="Producers with longest and shortest interval between wins">
            <DataTable
              title="Maximum"
              headers={["Producer", "Interval", "Previous Year", "Following Year"]}
              columns={["producer", "interval", "previousYear", "followingYear"]}
              data={[
                { id: 1, producer: "Matthew Vaughn", interval: 13, previousYear: 2002, followingYear: 2015 },
              ]}
              searchable={false}
            />
            <DataTable
              title="Minimum"
              headers={["Producer", "Interval", "Previous Year", "Following Year"]}
              columns={["producer", "interval", "previousYear", "followingYear"]}
              data={[
                { id: 1, producer: "Joel Silver", interval: 1, previousYear: 1990, followingYear: 1991 },
              ]}
              searchable={false}
            />
          </Card>
        </div>
        <div className="grid-item">
          <DataTable
            title="List movie winners by year"
            headers={["ID", "Year", "Title"]}
            columns={["id", "year", "title",]}
            data={[
              { id: 1, year: 2023, title: 'Some Movie'},
              { id: 2, year: 2022, title: 'Another Movie'},
            ]}
            searchable={true}
          />
        </div>
      </div>
    </>
  );
}

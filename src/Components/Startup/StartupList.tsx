import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Startup } from '../../Types/Startup';
import { StartupHttpService } from '../../Http/Startup/Startup.http.service';
import {
  Card,
  CardContent,
  List,
  ListItem,
  Pagination,
  Typography,
} from '@mui/material';

const countPages = (arr: Startup[]): number => {
  const length = arr.length;
  const pageAmount = Math.ceil(length / 20);

  return pageAmount;
};

export default function StartupList(): ReactElement {
  const [startupsList, setStartupsList] = useState<Startup[]>([]);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startupsInCurrentPage, setStartupsInCurrentPage] = useState<Startup[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StartupHttpService.getStartups();
        setStartupsList(data);
        const pages = countPages(data);
        setAmountOfPages(pages);
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = (currentPageNumber - 1) * 20;
    const end = currentPageNumber * 20;
    const startupsInPage = startupsList.slice(start, end);

    setStartupsInCurrentPage(startupsInPage);
  }, [currentPageNumber, startupsList]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageNumber(value);
  };

  return (
    <Fragment>
      <List id="startup-list">
        {startupsInCurrentPage.map((startup) => (
          <ListItem key={startup.id} className="MuiGrid-item">
            <Card className="MuiCard-root" style={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {startup.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  marginBottom={2}
                >
                  Founded: {startup.dateFounded.getFullYear()}
                  <span> | </span>
                  <span>{startup.employees} Employees</span>
                  <span> | </span>
                  <span>$ {startup.totalFunding} Mio.</span>
                  <span> | </span>
                  <span>{startup.currentInvestmentStage}</span>
                </Typography>
                <Typography variant="body2" component="div">
                  {startup.shortDescription}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={amountOfPages}
        variant="outlined"
        onChange={handleChange}
      />
    </Fragment>
  );
}

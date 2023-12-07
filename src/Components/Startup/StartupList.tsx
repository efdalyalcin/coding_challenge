import { ReactElement, useEffect, useState } from 'react';
import { Startup } from '../../Types/Startup';
import { StartupHttpService } from '../../Http/Startup/Startup.http.service';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';

export default function StartupList(): ReactElement {
  const [startupsList, setStartupsList] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StartupHttpService.getStartups();
        setStartupsList([...data]);
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <List id="startup-list">
      {startupsList.map((startup) => (
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
                Founded: {new Date(startup.dateFounded).getFullYear()}
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
  );
}

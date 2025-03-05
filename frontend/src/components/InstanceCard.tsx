import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';

interface Instance {
  id: string;
  unit: string;
  pricePerUnit: string;
  vcpu: string;
  memory: string;
  location: string;
  instanceType: string;
}

interface InstanceCardProps {
  instance: Instance;
}
const InstanceCard = ({ instance }: InstanceCardProps) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card
        sx={{
          maxWidth: 320,
          minWidth: 200,
          mx: 'auto',
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Background Glow Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 60,
            height: 60,
            bgcolor: 'blue.300',
            opacity: 0.2,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            width: 40,
            height: 40,
            bgcolor: 'purple.300',
            opacity: 0.2,
            borderRadius: '50%',
            filter: 'blur(30px)',
          }}
        />

        {/* Instance Image */}
        <CardMedia
          component="img"
          image={'/aws-instance.webp'}
          alt={instance.id}
          sx={{
            // width: 80,
            // height: 80,
            borderRadius: 2,
            mx: 'auto',
            boxShadow: 2,
            border: '1px solid #ddd',
            objectFit: 'contain',
          }}
        />

        <CardContent>
          {/* Instance Details */}
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            CPU: <Typography component="span">{instance.vcpu} vCPUs</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            RAM: <Typography component="span">{instance.memory} GB</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            InstanceType:{' '}
            <Typography component="span">{instance.instanceType}</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Location:{' '}
            <Typography component="span">{instance.location}</Typography>
          </Typography>

          {/* Price Button */}  
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                bgcolor: 'linear-gradient(45deg, #1976D2, #004BA0)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': { boxShadow: 5 },
              }}
            >
              ${instance.pricePerUnit}/{instance.unit}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InstanceCard;

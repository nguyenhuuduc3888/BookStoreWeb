package all.service.impl;

import all.dto.StatisticalDto;
import all.repository.IStatisticalRepository;
import all.service.IStatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticalService implements IStatisticalService {
    @Autowired
    IStatisticalRepository statisticalRepository;

    @Override
    public List<StatisticalDto> getList(String startDay, String endDay) {
        return statisticalRepository.getSellingBookTop10(startDay, endDay);
    }
}
